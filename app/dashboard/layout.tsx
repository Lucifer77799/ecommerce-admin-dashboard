"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  }

  return (
    <div className="min-h-screen">
     
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 text-sm rounded"
        >
          Logout
        </button>
      </header>

      
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
