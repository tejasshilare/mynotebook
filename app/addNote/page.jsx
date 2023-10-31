"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_PORT_URL || 3000;

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please enter a title.");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Failed to create a Note");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <nav className="flex justify-left items-center px-8 py-3 bg-black text-gray-50">
        New Note
      </nav>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Write your note title here:"
      ></input>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Description"
      ></input>
      <button
        type="submit"
        className="bg-green-600 font-bold hover:scale-105 transition-all text-white py-3 px-6 w-fit"
      >
        Add Note
      </button>
    </form>
  );
}
