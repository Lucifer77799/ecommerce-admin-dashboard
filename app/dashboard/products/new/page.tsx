"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productSchema } from "@/lib/validators/product";

export default function NewProductPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    return data.url as string;
  }

  // ✅ STEP 1 VALIDATION
  function validateStep1() {
    const parsed = productSchema.pick({ name: true }).safeParse({
      name,
    });

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((e) => {
        if (e.path[0]) errs[e.path[0].toString()] = e.message;
      });

      setErrors(errs);
      return false;
    }

    setErrors({});
    return true;
  }

  // ✅ FINAL SUBMIT
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!imageFile) {
      setErrors({ image: "Image is required" });
      return;
    }

    const parsed = productSchema.safeParse({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
    });

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((e) => {
        if (e.path[0]) errs[e.path[0].toString()] = e.message;
      });

      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(imageFile);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...parsed.data,
          image: imageUrl,
        }),
      });

      if (!res.ok) {
        alert("Failed to create product");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            className="border p-2 w-full"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name}</p>
          )}

          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files?.[0] || null)
            }
          />
          {errors.image && (
            <p className="text-red-600 text-sm">{errors.image}</p>
          )}

          <button
            onClick={() => validateStep1() && setStep(2)}
            className="bg-black text-white px-4 py-2"
          >
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price}</p>
          )}

          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          {errors.stock && (
            <p className="text-red-600 text-sm">{errors.stock}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="border px-4 py-2"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2"
            >
              {loading ? "Saving..." : "Create Product"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
