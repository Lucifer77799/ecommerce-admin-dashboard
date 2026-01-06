export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  await connectDB();

  const products = JSON.parse(
    JSON.stringify(
      await Product.find().sort({ createdAt: -1 })
    )
  );

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          Admin Dashboard
        </h1>

        <div className="flex gap-4">
          <Link
            href="/dashboard/products/new"
            className="px-6 py-3 border border-cyan-500 text-cyan-400"
          >
            + Add Product
          </Link>

          <Link
            href="/dashboard/admins/new"
            className="px-6 py-3 border border-purple-500 text-purple-400"
          >
            + Add Admin
          </Link>
        </div>
      </div>

      <DashboardClient initialProducts={products} />
    </div>
  );
}
