import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get("handle");
  const data = await req.formData();
  const linktext = data.get("linktext");
  const link = data.get("link");

  if (!handle || !linktext || !link) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  await collection.updateOne(
    { handle },
    {
      $push: {
        links: {
          link,
          linktext,
        },
      },
    }
  );

  return NextResponse.redirect(`/${handle}`);
}
