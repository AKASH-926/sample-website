import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "../login/login.css"
export default function Login() {
    const [data, setdata] = useState({ email: "", password: "", check: false })
    const [verify, setverify] = useState({ email: true })
    const navigate = useNavigate();
    const handlelogin = async (e) => {
        e.preventDefault()
        if (data.email === "" || data.password === "") {
            return alert(" Enter the credentials")
        }
        const { email, password } = data
        const response = await fetch("http://localhost:8000/nosebook/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password
            })
        })
        const data1 = await response.json()

        console.log(data1)
        if (data1.status === "failure" || !data1 || data1.status === 400) {
            window.alert(data1.message)
            window.alert("Login failed")
            console.log("Login Not succesfull");
        } else {
            window.localStorage.setItem('token', data1.token)
            // window.alert("Login succesfull")
            setdata({ ...data, email: "", password: "", check: true })
            navigate('/mypage');
        }
    }
    return (
        <>

            <div id='log-body'>
                <div id='login-container'>
                    <div id='log_img'>
                        <img id='img_login' src="./login-i.jpg" alt="" />
                    </div>
                    <div id='login-box'>
                        <div id='form-wrap'>
                            <h2 id='log_head'>LOGIN</h2>
                            <form action="POST">
                                <div className='margin-5per'>
                                    <label htmlFor="email">Email</label> <br />
                                    <input className='log_inp' type="email" name="l_email" id="l_email" value={data.email} onChange={(e) => {
                                        if (!e.target.value.includes("@")) {
                                            setverify({ ...verify, email: false })
                                        } else {
                                            setverify({ ...verify, email: true })
                                        }
                                        if (e.target.value === "") {
                                            setverify({ ...verify, email: true })
                                        }
                                        setdata({ ...data, email: e.target.value })

                                    }} />
                                    {verify.email ? <p> </p> : <p className="alert">Enter valid Email </p>}
                                </div>
                                <div className='margin-5per'>
                                    <label htmlFor="password">Password</label> <br />
                                    <input className='log_inp' type="password" name="l_password" id="l_password" value={data.password} onChange={(e) => {
                                        setdata({ ...data, password: e.target.value })
                                    }} />
                                </div>
                                <div className='margin-5per'>
                                    <input type="checkbox" name="checkbox" id="checkbox" onChange={() => {
                                        setdata({ ...data, check: !data.check })
                                    }} />
                                    <span id='logged'>Remember me</span> <span id='forgot'><button id='fogo_butn'>Forgot password?</button></span>

                                </div>
                                <button id='log_butn' onClick={handlelogin}>LOGIN</button>
                                <div className='sign_log_route'>
                                    <Link to={"/"}> Don't have Account?<span className='feature-text'>Signup!!</span> </Link>
                                </div>

                            </form>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
