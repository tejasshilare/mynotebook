import EditNote from "@/components/editNote";
const apiUrl = process.env.NEXT_PUBLIC_PORT_URL || 3000;

const getNoteById = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/api/notes/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch the note.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function editNote({ params }) {
  const { id } = params;
  const { note } = await getNoteById(id);
  const { title, description } = note;

  return <EditNote id={id} title={title} description={description} />;
}
