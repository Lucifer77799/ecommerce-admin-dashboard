import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// CREATE PRODUCT
export async function POST(req: Request) {
  await connectDB();

  const { name, description, price, stock, image } =
    await req.json();

  if (!name || price == null || stock == null || !image) {
    return NextResponse.json(
      { message: "Name, price, stock and image are required" },
      { status: 400 }
    );
  }

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    image, 
  });

  return NextResponse.json(
    {
      message: "Product created successfully",
      product,
    },
    { status: 201 }
  );
}

// GET ALL PRODUCTS
export async function GET() {
  await connectDB();

  const products = await Product.find().sort({ createdAt: -1 });

  return NextResponse.json({ products });
}
