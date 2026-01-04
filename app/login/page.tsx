"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md border border-gray-800 rounded-xl p-8"
      >
        
        <h1 className="text-3xl font-semibold mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Enter your credentials to continue
        </p>

       
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-md
              bg-black border border-gray-700
              text-white placeholder-gray-500
              focus:outline-none
              focus:border-cyan-500
              focus:shadow-[0_0_10px_#22d3ee]
              transition
            "
            required
          />
        </div>

        
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-3 rounded-md
              bg-black border border-gray-700
              text-white placeholder-gray-500
              focus:outline-none
              focus:border-cyan-500
              focus:shadow-[0_0_10px_#22d3ee]
              transition
            "
            required
          />
        </div>

        
        {error && (
          <p className="text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

       
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-md text-base font-medium
            border border-cyan-500 text-cyan-400
            hover:text-white
            hover:shadow-[0_0_18px_#22d3ee]
            transition
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
