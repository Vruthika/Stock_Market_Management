import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    localStorage.setItem("authToken", "dummy_token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-500">Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 mb-4 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-700 mb-6 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded text-white"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-indigo-400 cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
