import { useState, useEffect } from 'react'
import './App.css';
import PokemonCard from './components/PokemonCard';
import { getPokemons, searchPokemons, get_types_of_pokemons, getPokemonsOfSpecificType } from './api/pokemon_api';

function App() {
  const [pokemons, set_pokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [types, set_types] = useState([])
  const [filter_type, set_filter_type] = useState("All")
  const [searched_pokemon, set_searched_pokemon] = useState("")


  useEffect(() => {
    loadTypes();
  }, []);


  useEffect(() => {
    if (filter_type === "All" && searchQuery.trim() == "") {
      loadPokemons();
    } else {
      loadPokemonsOfSpecificType(filter_type);
    }
  }, [filter_type]);

  useEffect(() => {
    if (filter_type === "All" && searchQuery.trim() == "") {
      loadPokemons();
    } else {
      set_filter_type("All")
    }
  }, [searchQuery])


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
      const all_types = await get_types_of_pokemons()
      set_types(all_types)
    } catch (e) {
      console.error(e)
    }
  }


  const handleSearch = async (e) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) {
      loadPokemons()
      return
    }

    const results = await searchPokemons(searchQuery)
    set_pokemons(results)
  }


  const get_filter_value = (url) => {
    const parts = url.split('/');
    const pokemonId = parts[parts.length - 2];
    return pokemonId
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
        />
        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>

      <div className="types-container">
        {types.map(type => {

          const typeId = get_filter_value(type.url);
          const isActive = (type.name === "all" && filter_type === "All") || (filter_type === typeId);

          return (
            <button 
              key={type.name} 
              className={isActive ? 'active-filter' : 'type-header'}
              onClick={() => set_filter_type(type.name === "all" ? "All" : typeId)}
            >
              {type.name}
            </button>
          );
        })}
      </div>

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
