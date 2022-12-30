import React from 'react'
import Note from './Notes'

const Home = (props) => {
  const {showAlert} = props; //destructuring get showAlert from the pros 

  return (
    <div>
      {/* <Header /> */}
      <Note showAlert={showAlert} />
    </div>
  )
}

export default Home