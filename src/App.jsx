import { useState, useEffect } from 'react'
import './App.css';
import PokemonCard from './components/PokemonCard';
import { getPokemons, searchPokemons } from './api/pokemon_api';

function App() {
  const [pokemons, set_pokemons] = useState([])

  useEffect(() => {
    const fetch_pokemons = async () => {
      try {
        const all_pokemons = await getPokemons()
        set_pokemons(all_pokemons)
      } catch (e){
        console.log(err)
      }
    }

    fetch_pokemons ()
  }, [])

  return (
    <div className='container'>
      {pokemons.map(pokemon => (
        <PokemonCard pokemon={pokemon} key={pokemon.name}/>
      ))}
    </div>
  )
}

export default App
