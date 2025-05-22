const express = require("express");
const ChatMessage = require("../models/chatmessage.model");
const ChatRoom = require("../models/chatroom.model");
const authenticate = require("../utils/authenticate");

const router = express.Router();

// Get messages for a specific chat room
router.get("/:chatRoomId", authenticate, async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      chatRoomId: req.params.chatRoomId,
    })
      .populate("sender", "username avatarUrl")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Send a message
router.post("/sendMessage", authenticate, async (req, res) => {
  try {
    const { recipientId, text } = req.body;

    if (!text.trim())
      return res.status(400).json({ message: "Message cannot be empty" });

    // Find or create a chat room for this pair of users
    let chatRoom = await ChatRoom.findOne({
      participants: { $all: [req.user._id, recipientId] },
    });

    if (!chatRoom) {
      // If no chat room exists, create one
      chatRoom = new ChatRoom({
        participants: [req.user._id, recipientId],
      });
      await chatRoom.save();
    }

    // Create a new message
    const newMessage = new ChatMessage({
      chatRoomId: chatRoom._id,
      sender: req.user._id,
      text,
    });

    await newMessage.save();

    // Emit message via Socket.io (assuming Socket.io is set up)
    req.io.to(chatRoom._id).emit("receiveMessage", {
      _id: newMessage._id,
      sender: { username: req.user.username, avatarUrl: req.user.avatarUrl },
      text: newMessage.text,
    });

    res.json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
