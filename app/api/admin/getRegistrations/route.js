import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`http://localhost:8000/get-registrations`);

    const { success, registrations } = await res.json();

    return NextResponse.json({ success: success, data: registrations });
}
