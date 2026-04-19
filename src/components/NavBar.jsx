import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='navBar'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/your_pokemon">Your Pokemon</Link></li>
        <li><Link to="/about">About</Link></li>
    </nav>
  )
}

export default NavBar
