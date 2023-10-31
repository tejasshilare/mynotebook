import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const apiUrl = process.env.NEXT_PUBLIC_PORT_URL || 3000;

const getNotes = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/notes`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch your Notes");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading notes: ", error);
    return { notes: [] };
  }
};

export default async function NotesList() {
  const { notes } = await getNotes();
  return (
    <>
      {notes.map((t) => (
        <div
          key={t._id}
          className="p-4 border rounded-md border-slate-300 my-3 flex justify-between gap-5 items-start transition duration-150 hover:bg-red-50 hover:scale-105"
        >
          <div>
            <h2 className="font-bolt text-2xl">{t.title}</h2>
            <p>{t.description}</p>
          </div>
          <div className="flex gap-3">
            <RemoveBtn id={t._id} />
            <Link href={`/editNote/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
