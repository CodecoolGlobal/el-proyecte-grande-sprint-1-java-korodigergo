import NoteHeadBar from "./NoteHeadBar";
import NoteList from "./NoteList";
import "./Note.css";


export default function NotePage(){
  return(
    <div>
      <NoteHeadBar/>
      <NoteList/>
    </div>
  )
}