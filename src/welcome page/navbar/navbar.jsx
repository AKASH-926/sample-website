import React from 'react'
import "../navbar/navbar.css"
import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <>
            <div id='navbar-box'>
                <nav>
                    <ul id='nav-list'>
                        <li ><Link className='links' to={"/mypage"}>MY-SPACE</Link>   </li>
                        <li> <Link className='links' to={"/mypage"}>HOME</Link></li>
                        <li><Link className='links' to={"/mypage"}>ABOUT US</Link></li>
                        <li><Link className='links' to={"/mypage"}>CONTACT US</Link></li>
                        <li><Link className='links' to={"/login"}>LOGOUT</Link></li>
                    </ul>

                </nav>

            </div>
        </>
    )
}
