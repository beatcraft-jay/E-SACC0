import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
    const [theme, setTheme] = useState("light")

    const darkLight = () => {
        if(theme === 'light'){
            setTheme('dark')
        }else{
        setTheme('light')
        }
    }
  return (
    <div className="App" class="container d-flex align-items-center justify-content-center min-vh-100" data-theme={theme}>
        <div class='row border rounded-3 bg-white shadow box-area'>
        <div class=" rounded-4 left-box" className='bg'>
            <div class=" d-flex align-items-center justify-content-center flex-column">
                <div class="featured-image mb-3 logo">
                    <img src="assets/img/LOGO.png" class="img-fluid" alt=""/>
                </div>
                <p class="fs-2 mt-4 main-text">Join us</p>
                <small class="text-wrap text-center text-primary small-text">Experience ease hitting your financial goals.</small>
            </div>
        </div>
            
            
            <div class="col-md-6 right-box">
                <div class="row align-items-center">

                    <div class="position-relative" onClick={darkLight}>
                        {theme === 'light' ? <i class="bi bi-toggle-off fs-6 position-absolute top-0 end-0 translate-middle" ></i>: <i class="bi bi-toggle-on fs-6 end-0 position-absolute top-0 end-0 translate-middle"></i>}
                    </div>
                    <div class="header-text b-4 text-info">
                        <h2 class="main-text">SIGN UP!</h2>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" placeholder="Username" class="fs-6 form-control border-top-0 border-end-0 border-start-0 border border-2 main-text" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" placeholder="NIN" class="fs-6 form-control border-top-0 border-end-0 border-start-0 border border-2 main-text" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" placeholder="Email / Phone" class="fs-6 form-control border-top-0 border-end-0 border-start-0 border border-2 main-text" id="exampleInputPassword1"/>
                    </div><div class="input-group mb-3">
                        <input type="password" placeholder="Create password" class="fs-6 form-control border-top-0 border-end-0 border-start-0 border border-2 main-text" id="exampleInputPassword1"/>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" placeholder="Confirm Password" class="fs-6 form-control border-top-0 border-end-0 border-start-0 border border-2 main-text" id="exampleInputPassword1"/>
                    </div>
                    <div class="input-group mb-3">
                        <button class="btn btn-lg btn-primary w-100 fs-6 main-text" type="button">SIGN UP</button>
                    </div>
                    <div class="main-text">Have an account? <Link to="/">Login</Link></div>
                </div>
                <div class="row mb-4 align-items-center d-flex justify-content-around">
                    <div class="pt-4 d-flex justify-content-around">
                        <a href="#" class="icons"><i class="bi bi-twitter-x"></i></a>
                        <a href="#" class="icons"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="icons"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="icons"><i class="bi bi-whatsapp"></i></a>
                    </div>
                </div>
                <div class="row d-flex justify-content-around">
                    <small class="text-wrap text-center small-text">© 2024 Copyright Beatcraft</small>
                </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default Login

