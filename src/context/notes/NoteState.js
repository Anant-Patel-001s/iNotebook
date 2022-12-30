import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get all notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json);
  }

    //Add a note
    const addNote = async (title, description, tag) => {
      // todo: API call
      // API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      const note = await response.json();
      setNotes(notes.concat(note))
    }
    // Delete a node 
    const deleteNote =  async(id) => {
      // TODO: API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = response.json();
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
    }
    // Edit a note
    const editNote = async (id, title, description, tag) => {
      // API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = response.json();
      getNotes();

      let newNotes = JSON.parse(JSON.stringify(notes));
      //Logic to edit in client 
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id){
        newNotes.title = title;
        newNotes.description = description;
        newNotes.tag = tag;
        break;
        } 
      }
      setNotes(newNotes);
    }


    return (
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
      </NoteContext.Provider>
    )
}

  export default NoteState;   