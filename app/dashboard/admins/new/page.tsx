"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAdminPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Admin created successfully");
      router.push("/dashboard");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to create admin");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-10 max-w-md space-y-4"
    >
      <h1 className="text-2xl font-bold">
        Add New Admin
      </h1>

      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2"
      >
        {loading ? "Creating..." : "Create Admin"}
      </button>
    </form>
  );
}
