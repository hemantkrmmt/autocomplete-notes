import React, {  useState } from "react";
import "./style.css";
// import CreateNote from "../CreateNote";
import Notes from "../Notes";

function Autocomplete() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleCreateNote = () => {
    setNotes([
      { id: Date.now(), value: "", focus: true, references: [] },
      ...notes,
    ]);
  };
  const handleSetNote = (updatedNote) => {
    setNotes((prevState) => {
      return prevState.map((note) => {
        return note.id !== updatedNote.id
          ? note
          : {
              ...updatedNote
            };
      });
    });
  };

  return (
    <div className="autocomplete-container">
      <div className="search-notes">
        <div className="search-box">
          <img width="20px" src="/svgIcons/search.svg" alt="" />
          <input
            placeholder="Search Notes"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>

        <img
          className="create-note-icon"
          onClick={handleCreateNote}
          width="20px"
          src="/svgIcons/edit.svg"
          alt=""
        />
      </div>
      <div className="notes-container">
        <Notes
          notes={
            searchText
              ? notes.filter((note) => note.value.toLowerCase().includes(searchText.toLocaleLowerCase()))
              : notes
          }
          setNote={handleSetNote}
        />
      </div>
    </div>
  );
}

export default Autocomplete;
