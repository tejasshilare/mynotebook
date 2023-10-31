"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_PORT_URL || 3000;

export default function EditNote({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiUrl}/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("Failed to update Note");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <nav className="flex justify-left items-center px-8 py-3 bg-black text-gray-50">
        Edit Note
      </nav>
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Title"
      ></input>
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Description"
      ></input>
      <button
        type="submit"
        className="bg-green-600 hover:scale-105 transition-all font-bold text-white py-3 px-6 w-fit"
      >
        Update
      </button>
    </form>
  );
}
