import { useState, useEffect, memo } from 'react'
import './App.css';
import Home from './pages/Home';
import YourPokemon from './pages/YourPokemon';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home />} /> 
        <Route path="/your_pokemon" element={<YourPokemon />} />
      </Routes>
    </Router>
  )
}

export default App
