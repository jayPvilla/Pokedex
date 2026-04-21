import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import pokedexIcon from '../assets/pokedex_icon.png'

const NavBar = () => {
  return (
    <nav className='navBar'>
      <div className='title-container'>
        <img src={pokedexIcon} alt="Pokedex Icon" className="navbar-icon" />
        <h1 className='app-title'>POKEDEX</h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/your_pokemon">My Pokemon</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar
