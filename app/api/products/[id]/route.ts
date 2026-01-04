import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

// UPDATE PRODUCT
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;
  const data = await req.json();

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!updatedProduct) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
}

// DELETE PRODUCT
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Product deleted successfully",
  });
}
