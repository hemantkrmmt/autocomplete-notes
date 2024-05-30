import React, { useEffect, useState, useRef } from "react";
import Popup from "../Popup";
import "./style.css";

function Note({ notes, note, setNote }) {
  const divRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchText, setSearchText] = useState(false);

  const [divText, setDivText] = useState("");

  const checkForReference = function () {
    const textString = divRef.current.innerText;
    const text = textString.trim();
    if (
      text.indexOf("<>") !== -1
    ) {
      if(text.lastIndexOf("<>") === text.length - 2 ){
      setShowPopup(true);
     
      }
      const lastIndex = text.lastIndexOf("<>");
      setSearchText(text.slice(lastIndex+2).trim());
    }
    
  };
  const replaceLast = (str,searchText,replaceText)=>{
    const lastIndex = str.lastIndexOf(searchText);
    const firstStr =  str.slice(0,lastIndex);
    const updatedStr = replaceText
    return firstStr+updatedStr;
  }

  const handleSelectedText = (selectedText) => {
    const htmlAnchor = `<span contentEditable = "false">
                          <> <a id="anchor" href="#${selectedText.id}" onclick="(e)=>{e.preventDefault()}" >
                          ${selectedText.value}
                          </a>
                        </span>`;
    let tempStr = divRef.current.innerHTML;
    const tempNoteText = replaceLast(tempStr,"&lt;&gt;", htmlAnchor);
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

  const handleBlur = (e) => {
    if (divRef.current.innerHTML !== note.value) {
      setNote({
        ...note,
        focus: false,
        value: divRef.current.innerHTML,
      });
    }
    if(divRef.current !== e.target){
      setShowPopup(false);
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
          list={notes.filter((note1) =>  (note1.id !== note.id && note1.value.indexOf(searchText)!== -1))}
          handleSelectedText={handleSelectedText}
          dangerouslySetInnerHTML={note.value}
        />
      )}
    </div>
  );
}

export default Note;
