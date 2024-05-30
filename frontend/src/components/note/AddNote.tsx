import { useEffect, useState } from "react";

// @ts-ignore
export default function AddNote({ reFetchNotes, userId }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [userToken, setUserToken] = useState("");

  interface NewNote {
    title: string;
    text: string;
    userId: string;
    date: Date;
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt")!);

    setUserToken(token);
  }, []);

  async function addNote(newNote: NewNote) {
    try {
      const response = await fetch(`/api/note/${userId}`, {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      reFetchNotes();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleAddNote() {
    const userId = JSON.parse(localStorage.getItem("userId")!);
    //console.log(userId);
    const newNote = {
      title: title,
      text: text,
      userId: userId,
      date: date,
    };
    addNote(newNote);
  }

  return (
    <div id="add-note">
      <div id="box"></div>
      <div id="add-note-element-container">
        <div id="add-note-headbar">
          <h2>Add new note</h2>
          <button onClick={() => handleAddNote()}>Save</button>
        </div>
        <div id="add-note-textarea-container">
          <input
            id="add-note-set-date"
            type="date"
            onChange={(e) => setDate(new Date(e.target.value))}
          />
          <textarea
            id="add-note-textarea-title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your title..."
          ></textarea>
          <textarea
            id="add-note-textarea-text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Your text..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
