import { useState, useEffect } from 'react'
import './App.css';
import PokemonCard from './components/PokemonCard';
import { getPokemons, searchPokemons, getPokemonsByType } from './api/pokemon_api';

function App() {
  const [pokemons, set_pokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [types, set_types] = useState([])

  // Initial load
  useEffect(() => {
    loadDefaultPokemons()
    loadTypes() // Added this call
  }, [])

  const loadDefaultPokemons = async () => {
    try {
      const all_pokemons = await getPokemons()
      set_pokemons(all_pokemons)
    } catch (e) {
      console.error(e)
    }
  }

  const loadTypes = async () => {
    try {
      const all_types = await getPokemonsByType()
      set_types(all_types)
    } catch (e){
      console.error(e)
    }
  }

  const handleSearch = async (e) => {
    if (e) e.preventDefault() // Check if event exists
    
    if (!searchQuery.trim()) {
      loadDefaultPokemons()
      return
    }
    
    const results = await searchPokemons(searchQuery)
    set_pokemons(results)
  }

  return (
    <main className='main-content'>
      <div className="types-container">
        {types.map(type => (
          <div className='type-header' key={type.name}>
            {type.name}
          </div>
        ))}
      </div>

      <form className="search" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search Pokemon..." 
          spellCheck="false" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          // Removed redundant onKeyDown
        />
        <button type="submit">Search</button>
      </form>

      <div className='container-pokemons'>
        {pokemons.length > 0 ? (
          pokemons.map(pokemon => (
            <PokemonCard pokemon={pokemon} key={pokemon.name} />
          ))
        ) : (
          <p>No Pokemon found!</p>
        )}
      </div>
    </main>
  )
}

export default App
