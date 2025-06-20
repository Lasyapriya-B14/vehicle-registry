import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const res = await fetch(`http://localhost:8000/get-reg/${session?.user.id}`);

  const { success, regs } = await res.json();

  return NextResponse.json({ success: success, data: regs });
}
