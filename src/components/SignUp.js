import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  // const history = use();  //use history
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //destructuring
    const {name ,email ,password } = credentials; //bhar kadho credential ni 
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email,password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success === true) {
      //save the auth  token and redirect  
      localStorage.setItem('token', json.authtoken);
      navigate('/')   //after login a user go to add notes page
      props.showAlert("Account Created Successfully", "success")
    }
    else {
      props.showAlert("Invalid Details", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) // add or overwrite
  }



  return (
    <div className='container' >
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-5 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="name" className="form-control" name='name' onChange={onChange} />
                            <label className="form-label" htmlFor="name">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="email" className="form-control" name='email' onChange={onChange} />
                            <label className="form-label" htmlFor="email">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="password" className="form-control" name='password' onChange={onChange} minLength={5} required />
                            <label className="form-label" htmlFor="password">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="cpassword" className="form-control" name='cpassword' onChange={onChange} minLength={5} required />
                            <label className="form-label" htmlFor="cpassword">Repeat your password</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" onClick={handleSubmit} className="btn btn-primary btn-lg">Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://www.bitofclarity.com/wp-content/uploads/2020/10/free-clarity-digital-notebook-minimalist-paperless-1536x1075.jpg"
                        className="img-fluid" alt="Sample Pic" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUp