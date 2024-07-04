import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.webp'
const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="container">
           <div className="logo">
            <img src={Logo} alt="" />
           </div>
           <div className="links">
            <Link className='link' to="/?cat=science">SCIENCE</Link>
            <Link className='link' to="/?cat=cinema">CINEMA</Link>
            <Link className='link' to="/?cat=art">DESIGN</Link>
            <Link className='link' to="/?cat=art">FOOD</Link>
            <Link className='link' to="/?cat=art">TECHNOLOGY</Link>
            <span>RONIT</span>
            <span>LOGOUT</span>
            <span>
              <Link className='write' to="/write">WRITE</Link>
            </span>
           </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
