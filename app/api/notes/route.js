import connectdb from "@/library/database";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await connectdb();
    await Note.create({ title, description });
    return NextResponse.json({ message: "Note Created" }, { status: 201 });
  } catch (error) {
    // Handle the error here, for example, log it and return an error response
    console.error("An error occurred in POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectdb();
    const notes = await Note.find();
    return NextResponse.json({ notes });
  } catch (error) {
    // Handle the error here, for example, log it and return an error response
    console.error("An error occurred in GET:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectdb();
    await Note.findByIdAndDelete(id);
    return NextResponse.json({ message: "Note Deleted" }, { status: 200 });
  } catch (error) {
    // Handle the error here, for example, log it and return an error response
    console.error("An error occurred in DELETE:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
