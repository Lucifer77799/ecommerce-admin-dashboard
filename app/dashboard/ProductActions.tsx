"use client";

import { useRouter } from "next/navigation";

export default function ProductActions({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={() => router.push(`/dashboard/products/${id}/edit`)}
        className="
          px-3 py-1 text-xs rounded
          border border-cyan-400/40 text-cyan-300
          hover:text-white
          hover:shadow-[0_0_15px_#22d3ee]
          transition
        "
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="
          px-3 py-1 text-xs rounded
          border border-red-400/40 text-red-400
          hover:text-white
          hover:shadow-[0_0_15px_#fb7185]
          transition
        "
      >
        Delete
      </button>
    </div>
  );
}
