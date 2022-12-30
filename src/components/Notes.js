import React, { useContext, useEffect, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitems from './Noteitem'
import AddNote from './AddNote'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  const [editModal, setEditModal] = useState(false);
  // const [value, setValue] = useState("");
  const handleClose = () => { setEditModal(false) };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes() // null value hoi to getNotes()
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  // const ref = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    // ref.current.click();
    setEditModal(true);
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const handleClick = (e) => {
    e.preventDefault();  //for not page reload
    console.log("Updating the note...");
    editNote(note.id, note.etitle, note.edescription, note.etag)
    setEditModal(false)
    props.showAlert("Updated Successfully", "success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }) // add or overwrite
  }
  // const handleChange = (event) =>{
  //   setValue(event.target.value)
  // }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <Modal
        show={editModal}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </Modal.Header>
        <Modal.Body>
          <form className='my-3'>
            <div className="mb-3">
              {/* form */}
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={4} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={4} required />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button onClick={handleClick} disabled={note.etitle.length < 4 || note.edescription.length < 4} type="button" className="btn btn-primary">Update Note</button>
        </Modal.Footer>
      </Modal>
      {/*<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
  </div>*/}
      <div className='row my-3'>
        <h2>Your Note</h2>
        <div className='container mx-2'>
          {notes.length === 0 && "No Notes to display"} {/* if no note available*/}
        </div>
        {notes.map((note) => {
          return <Noteitems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} /> //props
        })}
      </div>
    </>
  )
}

export default Notes