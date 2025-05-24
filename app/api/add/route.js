import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Incoming request body:", body); // debug log

    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    const doc = await collection.findOne({ handle: body.handle });
    if (doc) {
      return NextResponse.json({
        success: false,
        error: true,
        message: "This handle already exists",
        result: null,
      });
    }

    const result = await collection.insertOne(body);
    console.log("Inserted:", result);

    return NextResponse.json({
      success: true,
      error: false,
      message: "Your LinkTree has been generated",
      result,
    });
  } catch (err) {
    console.error("POST /api/add failed:", err); // log the real error
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: "Internal Server Error",
        result: null,
      },
      { status: 500 }
    );
  }
}
