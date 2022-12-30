import React, { useContext , useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e) => {
        e.preventDefault();  //for not page reload
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""}) //after adding note form will be empty
        props.showAlert("Added Note Successfully", "success")
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value}) // add or overwrite
    }
    return (

        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" minLength={4} onChange={onChange} value={note.title} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={4} value={note.description} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                </div>
                <button type="submit" disabled={note.title.length<4 || note.description.length<4 } className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote