import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`http://localhost:8000/get-owners`);

    const { success, owners } = await res.json();

    return NextResponse.json({ success: success, data: owners });
}
