const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/database.config.js");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config(); // Load .env variables

const app = express();
const port = process.env.PORT || 5000;

// HTTP & Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Set this properly in production
    credentials: true,
  },
});

// Attach io to app
app.set("io", io);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Routes
app.use("/auth", require("./routes/user.js"));
app.use("/products", require("./routes/products.js"));
app.use("/livechat", require("./routes/livechat.js"));
app.use("/stocks", require("./routes/stocks.data.js"));
app.use("/news", require("./routes/news.js"));
app.use("/courses", require("./routes/courses.js"));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "your_api_key"
);

// In-memory store for user-specific chat histories (use DB for production)
const userChats = {};

// Socket.IO: Real-time private chat
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`👤 User ${userId} joined private room: ${socket.id}`);
  });

  socket.on("sendMessage", (userId, message) => {
    socket.to(userId).emit("receiveMessage", message);
    console.log(`📩 Message sent to ${userId}: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Gemini AI Endpoint
app.post("/gemini", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message || typeof message !== "string") {
      return res.status(400).json({ error: "UserId and message are required" });
    }

    // Initialize user history if not existing
    if (!userChats[userId]) userChats[userId] = [];

    const history = userChats[userId];

    const formattedHistory = history.map((entry) => ({
      role: entry.role,
      parts: [
        { text: entry.parts.replace("**You:** ", "").replace("**Bot:** ", "") },
      ],
    }));

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: formattedHistory });

    console.log(`🤖 [${userId}] Input to Gemini: ${message}`);
    const result = await chat.sendMessage(message);
    const response = result.response;
    const reply = response.text();

    // Save interaction in memory
    userChats[userId].push({ role: "user", parts: message });
    userChats[userId].push({ role: "model", parts: reply });

    res.json({ reply });
  } catch (error) {
    console.error("❌ Gemini AI Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
