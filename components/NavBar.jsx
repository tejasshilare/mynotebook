import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-black text-gray-50">
      <Link href={"/"}>NoteBook</Link>
      <Link
        href={"/addNote"}
        className=" text-black  hover:scale-105 transition-all p-2 bg-white"
      >
        New Note
      </Link>
    </nav>
  );
}
