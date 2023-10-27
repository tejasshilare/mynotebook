import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-black text-gray-50">
      <Link href={"/"}>NoteBook</Link>
      <Link href={"/addNote"} className="p-2 bg-slate-200 text-black">
        New Note
      </Link>
    </nav>
  );
}
