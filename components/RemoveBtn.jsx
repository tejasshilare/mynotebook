"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_PORT_URL || 3000;

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeNote = async () => {
    const confirmed = confirm("Are you sure you want to remove?");

    if (confirmed) {
      const res = await fetch(`${apiUrl}/api/notes?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <>
      <button onClick={removeNote} className="text-red-600">
        <HiOutlineTrash size={24} />
      </button>
    </>
  );
}
