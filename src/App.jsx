import { useState, useEffect } from 'react'
import './App.css';
import PokemonCard from './components/PokemonCard';
import { getPokemons, searchPokemons, getPokemonsByType } from './api/pokemon_api';

function App() {
  const [pokemons, set_pokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState("") // State for input

  // Initial load
  useEffect(() => {
    loadDefaultPokemons()
  }, [])

  const loadDefaultPokemons = async () => {
    try {
      const all_pokemons = await getPokemons()
      set_pokemons(all_pokemons)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
        loadDefaultPokemons() // Reset if empty
        return
    }
    
    const results = await searchPokemons(searchQuery)
    set_pokemons(results)
  }


  return (
    <main className='main-content'>
      <form className="search" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search Pokemon..." 
          spellCheck="false" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter' && searchQuery.trim() !== ""){
              handleSearch()
          }}}
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
