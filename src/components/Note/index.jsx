import React, { useEffect, useState, useRef } from "react";
import Popup from "../Popup";
import "./style.css";

function Note({ notes, note, setNote }) {
  const divRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const [divText, setDivText] = useState("");

  const checkForReference = function (e) {
    const textString = divRef.current.innerHTML;
    const text = textString.trim();
    if (
      text.indexOf("&lt;&gt;") !== -1 &&
      text.lastIndexOf("&lt;&gt;") === text.length - 8
    ) {
      setShowPopup(true);
    } else {
      if (showPopup) setShowPopup(false);
    }
  };
  const handleSelectedText = (selectedText) => {
    const htmlAnchor = `<a contentEditable="false" id="anchor" href="#${selectedText.id}" onclick="(e)=>{e.preventDefault()}" >${selectedText.value}</a>`;
    const tempNoteText = divRef.current.innerHTML + "  " + htmlAnchor;
    setNote({
      ...note,
      focus: false,
      value: tempNoteText,
    });
    setNote({
      ...selectedText,
      references: [...selectedText.references, note.id],
    });
    setShowPopup(false);
  };

  const handleBlur = () => {
    if (divRef.current.innerHTML !== note.value) {
      setNote({
        ...note,
        focus: false,
        value: divRef.current.innerHTML,
      });
    }
  };

  useEffect(() => {
    setDivText(note.value);
  }, [note.value]);

  useEffect(() => {
    if (note.focus) {
      divRef.current?.focus();
    }
  }, [note.focus]);

  return (
    <div className="note-container">
      <div
        ref={divRef}
        id={note.id}
        className="note-wrapper"
        contentEditable={true}
        onKeyUp={checkForReference}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: divText }}
      ></div>

      {note.references.length > 0 && (
        <div style={{ color: "#828282" }}>
          <img width="10px" src="/svgIcons/right-arrow.svg" alt="" />{" "}
          {note.references.length} reference{note.references.length > 1 && "s"}
        </div>
      )}
      {showPopup && (
        <Popup
          key={"focus" + note.id}
          list={notes.filter((note1) => note1.id !== note.id)}
          handleSelectedText={handleSelectedText}
          dangerouslySetInnerHTML={note.value}
        />
      )}
    </div>
  );
}

export default Note;
