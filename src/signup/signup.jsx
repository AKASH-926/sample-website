import React from "react"
import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import "../signup/signup.css"
const Signup = () => {
    const [user, setuser] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [checks, setchecks] = useState({ name: true, email: true, password: true, confirmPassword: true })
    const navigate = useNavigate();
    const handleclick = async (e) => {
        e.preventDefault()

        const { name, email, password, confirmPassword } = user
        const response = await fetch("http://localhost:8000/nosebook/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, email, password, confirmPassword
            })
        })
        const data = await response.json()
        console.log(data)
        if (data.status === "failure" || !data || data.status === 400) {
            window.alert(data.message)
            window.alert("Signing up failed")
            console.log("Signup Not succesfull");
        } else {
            window.alert("Signup  succesfull")
            console.log("Signup succesfull");
            setuser({ ...user, name: "", email: "", password: "", confirmPassword: "" })
            navigate('/login');
        }

    }


    return (
        <>
            <div id="signup-body">
                <div id="main-container">
                    <div id="image-box" >
                        <img id="signup-image" src="./signup-i.jpg" alt="" />
                    </div>
                    <div id="form-box">
                        <h2 className="O-margin-bott">SIGN-UP</h2>
                        <div id="form">
                            <form method="POST">
                                <div className="m-g-b">
                                    <label htmlFor="name" className="label">Name</label><br />
                                    <input type="text" name="name" id="name" className="input-field" value={user.name} onChange={(e) => {
                                        if (!(/^[A-Za-z1-9]*$/.test(e.target.value))) {
                                            setchecks({ ...checks, name: false })
                                        } else {
                                            setchecks({ ...checks, name: true })
                                        }
                                        setuser({ ...user, name: e.target.value })

                                    }} />
                                    {checks.name ? <p> </p> : <p className="error">Name must contain Alphanumeric</p>}
                                </div>
                                <div className="m-g-b">
                                    <label htmlFor="email" className="label">Email</label><br />
                                    <input type="email" name="email" id="email" className="input-field" value={user.email} onChange={(e) => {
                                        if (!((e.target.value).includes("@"))) {
                                            setchecks({ ...checks, email: false })
                                        } else {
                                            setchecks({ ...checks, email: true })
                                        }
                                        if (e.target.value === "") {
                                            setchecks({ ...checks, email: true })
                                        }
                                        setuser({ ...user, email: e.target.value })
                                    }} />
                                    {checks.email ? <p> </p> : <p className="error">Enter Valid Email</p>}
                                </div>
                                <div className="m-g-b">
                                    <label htmlFor="password" className="label">Password</label><br />
                                    <input type="password" name="password" id="password" className="input-field" value={user.password} onChange={(e) => {
                                        if (!((e.target.value).length > 6)) {
                                            setchecks({ ...checks, password: false })
                                        } else {
                                            setchecks({ ...checks, password: true })
                                        }
                                        if (e.target.value === "") {
                                            setchecks({ ...checks, password: true })
                                        }
                                        setuser({ ...user, password: e.target.value })
                                    }} />
                                    {checks.password ? <p> </p> : <p className="error">Password length should be greater than 6 chars </p>}
                                </div>
                                <div className="m-g-b">
                                    <label htmlFor="password" className="label">Confirm Password</label><br />
                                    <input type="password" name="password" id="con_password" className="input-field" value={user.confirmPassword} onChange={(e) => {
                                        if (!((e.target.value) === user.password)) {
                                            setchecks({ ...checks, confirmPassword: false })
                                        } else {
                                            setchecks({ ...checks, confirmPassword: true })
                                        }
                                        if (e.target.value === "") {
                                            setchecks({ ...checks, confirmPassword: true })
                                        }
                                        setuser({ ...user, confirmPassword: e.target.value })
                                    }} />
                                    {checks.confirmPassword ? <p> </p> : <p className="error">Password Mismatch </p>}
                                </div>
                                <div id="butn" className="m-g-b">
                                    <button onClick={handleclick} >SIGNUP</button>
                                </div>
                            </form>
                            <div className='sign_log_route'>
                                <Link to={"/login"}>Aldready have Account?<span className='feature-text'>Login!!</span> </Link>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default Signup;