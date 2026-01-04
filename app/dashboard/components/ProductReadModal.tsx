"use client";

import { useState } from "react";

type Product = {
  name: string;
  image: string;
  price: number;
  stock: number;
  description?: string;
};

export default function ProductReadModal({
  product,
}: {
  product: Product;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
     
      <button
        onClick={() => setOpen(true)}
        className="text-cyan-400 hover:underline"
      >
        {product.name}
      </button>

   
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-black border border-gray-700 rounded-lg p-6 w-full max-w-2xl text-white">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Product Details
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            
            <div className="flex flex-col md:flex-row gap-6">
            
              <img
                src={product.image}
                alt={product.name}
                className="w-56 h-56 object-cover rounded border border-gray-700"
              />

             
              <div className="flex-1">
                <h3 className="text-2xl font-medium mb-2">
                  {product.name}
                </h3>

                <p className="text-cyan-400 text-lg mb-1">
                  ₹{product.price}
                </p>

                <p className="text-gray-300 mb-4">
                  Stock: {product.stock}
                </p>

                {product.description && (
                  <p className="text-gray-300 text-base leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
