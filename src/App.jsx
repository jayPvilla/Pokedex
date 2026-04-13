import { useState, useEffect } from 'react'
import './App.css';
import PokemonCard from './components/PokemonCard';
import { getPokemons, searchPokemons, getPokemonsByType, getPokemonsOfSpecificType } from './api/pokemon_api';

function App() {
  const [pokemons, set_pokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [types, set_types] = useState([])
  const [filter_type, set_filter_type] = useState("All")


  useEffect(() => {
    loadTypes();
  }, []);

  useEffect(() => {
    if (filter_type === "All") {
      loadPokemons();
    } else {
      loadPokemonsOfSpecificType(filter_type);
    }
  }, [filter_type]);


  const loadPokemons = async () => {
    const all_pokemons = await getPokemons();
    set_pokemons(all_pokemons);
  };

  
  const loadPokemonsOfSpecificType = async (typeId) => {
    try {
      const pokemonsOfSpecificType = await getPokemonsOfSpecificType(typeId);
      set_pokemons(pokemonsOfSpecificType);
    } catch (e) {
      console.error(e);
    }
  };

  const loadTypes = async () => {
    try {
      const all_types = await getPokemonsByType()
      set_types(all_types)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSearch = async (e) => {
    if (e) e.preventDefault() // Check if event exists

    if (!searchQuery.trim()) {
      loadPokemons()
      return
    }

    const results = await searchPokemons(searchQuery)
    set_pokemons(results)
  }

  return (
    <main className='main-content'>
      <div className="types-container">
        {types.map(type => (
          <button className='type-header' key={type.name} onClick={type.name == "all" ? () => set_filter_type("All")
            : () => set_filter_type(() => {
            const url = type.url;
            const parts = url.split('/');
            const pokemonId = parts[parts.length - 2];
            return pokemonId
          })}>
            {type.name}
          </button>
        ))}
      </div>

      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Pokemon..."
          spellCheck="false"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
