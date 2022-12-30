
import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
import './About.css'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  // const history = use();  //use history
  let navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if(json.success===true){
      //save the auth  token and redirect  
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      navigate('/');   //after login a user go to add notes page
    }
    else{
      props.showAlert("Invalid Details", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) // add or overwrite
  }

  return (
    <div className='container' id='login'>
      <section className="text-center text-lg-start">


        <div className="container py-2">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right" style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">LogIn to iNotebook</h2>
                  <form>

                    <div className="form-outline mb-4">
                      <input type="email" id="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                      <label className="form-label" htmlFor="emaill">Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" id="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>

                    <button type="button" onClick={handleSubmit} className="btn btn-primary btn-block mb-4">
                      Sign up
                    </button>

                    <div className="text-center">
                      <p>or sign up with:</p>
                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                      </button>

                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                      </button>

                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                      </button>

                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <img src="https://i.redd.it/p894hf7go2b51.jpg" className="w-100 rounded-4 shadow-4"
                alt="" />
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Login