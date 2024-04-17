import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  text: string;
  created: Date;
  userId: number;
}
export default function Notes(){
  const [userId, setUserId] = useState(-1);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('userId')!);
    if (id > 0) {
      setUserId(id);
      async function fetchNotes(id: number) {
        const res = await fetch(`/api/note/${id}/all`);
        const notes = await res.json();
        setNotes(notes);
      }
      fetchNotes(id);
      console.log("2. " + userId);
    }
  }, []);

  return (
  <div>
    {notes && notes.map((note) => (
      <div>
        <h2>{note.title}</h2>
        <h2>{note.text}</h2>
      </div>
        
    ))}
  </div>);
}