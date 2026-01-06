"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ProductActions from "./ProductActions";
import ProductCharts from "./components/ProductCharts";
import ProductReadModal from "./components/ProductReadModal";

export default function DashboardClient({
  initialProducts,
}: {
  initialProducts: any[];
}) {
  const { data, error } = useSWR("/api/products", fetcher, {
    fallbackData: { products: initialProducts },
  });

  if (error) {
    return <p className="text-red-500">Failed to load products</p>;
  }

  const products = data?.products || [];

  return (
    <>
      {/* PRODUCT TABLE */}
      <div className="border border-gray-800 rounded-lg overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr
                key={p._id}
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >
                <td className="p-4">
                  <a href={p.image} target="_blank" rel="noreferrer">
                    <img
                      src={p.image}
                      className="h-14 w-14 rounded object-cover"
                    />
                  </a>
                </td>

                <td className="p-4">
                  <ProductReadModal product={p} />
                </td>

                <td className="p-4 text-cyan-400">₹{p.price}</td>
                <td className="p-4">{p.stock}</td>

                <td className="p-4">
                  <ProductActions id={p._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CHARTS */}
      <div className="border border-gray-700 rounded-lg p-6 bg-gray-950">
        <h2 className="text-lg mb-4 text-gray-200">
          Inventory Analytics
        </h2>

        <ProductCharts
          products={products.map((p: any) => ({
            name: p.name,
            price: p.price,
            stock: p.stock,
          }))}
        />
      </div>
    </>
  );
}
