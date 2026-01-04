"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  
  const [currentImage, setCurrentImage] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      setName(data.name);
      setDescription(data.description || "");
      setPrice(String(data.price));
      setStock(String(data.stock));
      setCurrentImage(data.image); // existing image
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  //IMAGE UPLOAD 
  async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    credentials: "include", 
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.url;
}


  // UPDATE PRODUCT
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let imageToSave = currentImage;

   
    if (newImageFile) {
      imageToSave = await uploadImage(newImageFile);
    }

        const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            image: imageToSave,
        }),
        });

        if (!res.ok) {
        alert("Failed to update product");
        return;
        }

        router.push("/dashboard");

  }

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-10 max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <div>
        <p className="text-sm mb-1">Current Image</p>
        <img
          src={currentImage}
          alt="Current product"
          className="h-32 w-32 object-cover rounded border"
        />
      </div>

      
      <div>
        <p className="text-sm mb-1">Change Image (optional)</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewImageFile(e.target.files?.[0] || null)
          }
        />
      </div>

      <input
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />

      <textarea
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        type="number"
        className="border p-2 w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />

      <input
        type="number"
        className="border p-2 w-full"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock"
      />

      <button className="bg-black text-white px-4 py-2">
        Update Product
      </button>
    </form>
  );
}
