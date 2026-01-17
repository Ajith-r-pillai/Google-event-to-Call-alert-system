import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ phone: null }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({
    email: session.user.email,
  });

  return NextResponse.json({ phone: user?.phone || "" });
}

export async function POST(req: Request) {
  const session = await auth();
  const { phone } = await req.json();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("users").updateOne(
    { email: session.user.email },
    { $set: { phone } },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
