import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin", // ADMIN CREATED HERE
  });

  return NextResponse.json(
    { message: "Admin created successfully" },
    { status: 201 }
  );
}
