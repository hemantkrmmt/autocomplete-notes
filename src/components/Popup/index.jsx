import React from "react";
import "./style.css";

function Popup({ list, handleSelectedText }) {
  return (
    <div className="suggestion-container">
      {list.map((suggestion, index) => {
        return (
          <div
          key={index}
            className="suggestion"
            onClick={() => {
              handleSelectedText(suggestion);
            }}
            dangerouslySetInnerHTML={{__html:suggestion.value}}
          >
            
          </div>
        );
      })}
    </div>
  );
}

export default Popup;
