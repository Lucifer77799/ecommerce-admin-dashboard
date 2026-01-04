export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductActions from "./ProductActions";
import ProductCharts from "./components/ProductCharts";
import Link from "next/link";
import ProductReadModal from "./components/ProductReadModal";

export default async function DashboardPage() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });

  return (
    <div className="p-8 bg-black text-white min-h-screen">
  
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          Admin Dashboard
        </h1>

       
        <div className="flex gap-4">
          <Link
            href="/dashboard/products/new"
            className="
              px-6 py-3 rounded-md text-base
              border border-cyan-500 text-cyan-400
              hover:text-white
              hover:shadow-[0_0_15px_#22d3ee]
              transition
            "
          >
            + Add Product
          </Link>

          <Link
            href="/dashboard/admins/new"
            className="
              px-6 py-3 rounded-md text-base
              border border-purple-500 text-purple-400
              hover:text-white
              hover:shadow-[0_0_15px_#a855f7]
              transition
            "
          >
            + Add Admin
          </Link>
        </div>
      </div>

     
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
            {products.map((p) => (
              <tr
                key={p._id.toString()}
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >
              
                <td className="p-4">
                  <a
                    href={p.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="
                        h-14 w-14 rounded object-cover cursor-pointer
                        hover:shadow-[0_0_10px_#22d3ee]
                        transition
                      "
                    />
                  </a>
                </td>

               
                <td className="p-4">
                  <ProductReadModal
                    product={{
                      name: p.name,
                      image: p.image,
                      price: p.price,
                      stock: p.stock,
                      description: p.description,
                    }}
                  />
                </td>

                <td className="p-4 text-cyan-400">
                  ₹{p.price}
                </td>

                <td className="p-4">
                  {p.stock}
                </td>

                <td className="p-4">
                  <ProductActions id={p._id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-gray-700 rounded-lg p-6 bg-gray-950">
        <h2 className="text-lg mb-4 text-gray-200">
          Inventory Analytics
        </h2>

        <ProductCharts
          products={products.map((p) => ({
            name: p.name,
            price: p.price,
            stock: p.stock,
          }))}
        />
      </div>
    </div>
  );
}
