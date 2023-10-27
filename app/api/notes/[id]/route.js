import connectdb from "@/library/database";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newTitle: title, newDescription: description } =
      await request.json();
    await connectdb();
    await Note.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    // Handle the error here, for example, log it and return an error response
    console.error("An error occurred in PUT:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectdb();
    const note = await Note.findOne({ _id: id });
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    // Handle the error here, for example, log it and return an error response
    console.error("An error occurred in GET:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
