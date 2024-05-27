import React from 'react'
import "./style.css"
import Note from '../Note'

function Notes({notes, setNote}) {
  return notes.map(note => {
    return <Note notes={notes}  key={note.id} note={note} setNote={setNote}/>
  })
}

export default Notes