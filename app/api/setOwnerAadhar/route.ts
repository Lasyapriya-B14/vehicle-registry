import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const body = await req.json();

  const res = await fetch(`http://localhost:8000/update-user-aadhar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({...body, owner_id: session?.user.id}),
  });

  const data = await res.json();
  return NextResponse.json({ success: data.success, message: data.message });
}
