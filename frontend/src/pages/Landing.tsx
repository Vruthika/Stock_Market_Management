import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <motion.h1
        className="text-4xl font-bold mb-4 text-indigo-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to VSS Textiles
      </motion.h1>
      <motion.p
        className="text-lg text-gray-300 mb-8 text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        A complete platform for trading, portfolio analysis, and market research.
        Sign up or log in to get started.
      </motion.p>
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
          onClick={() => navigate("/sign-in")}
        >
          Sign In
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </button>
      </motion.div>
    </div>
  );
};

export default Landing;
