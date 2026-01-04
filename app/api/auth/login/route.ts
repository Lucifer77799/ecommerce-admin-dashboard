import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { comparePassword, createToken } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = createToken({
    id: user._id,
    role: user.role,
  });

  const response = NextResponse.json({
    message: "Login successful",
  });

  // AUTH COOKIE
  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  // ROLE COOKIE 
  response.cookies.set("role", user.role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
