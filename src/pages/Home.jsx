import React from 'react'
import { useState, useEffect, memo, createContext } from 'react'
import '../App.css';
import PokemonCard from '../components/PokemonCard';
import SelectedPokemonCard from '../components/SelectedPokemonCard';
import Pagination from '../components/Pagination';
import { TypeButton } from '../components/TypeButton';
import {
  getPokemons,
  searchPokemons,
  get_types_of_pokemons,
  getPokemonsOfSpecificType,
  getDetailsOfSelectedType
}
  from '../services/pokemon_api';


const Home = () => {

  const [pokemons, set_pokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [types, set_types] = useState([])
  const [filter_type, set_filter_type] = useState("All")
  const [selected_pokemon, set_selected_pokemon] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonPerPage, setPokemonPerPage] = useState(15)

  useEffect(() => {
    loadTypes();
  }, []);


  useEffect(() => {
    if (filter_type === "All" && searchQuery.trim() == "") {
      loadPokemons();
    } else {
      loadPokemonsOfSpecificType(filter_type);
    }
    set_selected_pokemon("")
  }, [filter_type]);


  useEffect(() => {
    set_filter_type("All")
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

  const lastPostIndex = currentPage * pokemonPerPage
  const firstPostIndex = lastPostIndex - pokemonPerPage
  const currentPosts = pokemons.slice(firstPostIndex, lastPostIndex)

  return (
    <main className='main-content'>
      <header style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000 }}>
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Pokemon..."
            spellCheck="false"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>

        <section className="types-container">
          {types.map(type => {

            const typeId = get_filter_value(type.url);
            const isActive = (type.name === "all" && filter_type === "All") || (filter_type === typeId);

            return (
              <TypeButton
                key={type.name}
                type={type}
                isActive={isActive}
                get_filter_value={get_filter_value}
                getDetailsOfSelectedType={getDetailsOfSelectedType}
                onClick={() => set_filter_type(type.name === "all" ? "All" : typeId)}
              />
            );
          })}
        </section>
      </header>
      
      <section className='content-section' style={{ display: 'flex', justifyContent: selected_pokemon ? 'space-between' : 'center', position: 'relative', minWidth: '100%', alignItems: 'flex-start', flex: 1, overflowY: 'auto', maxHeight: '100%' }}>
        <div className='container-pokemons' style={{ flex: selected_pokemon ? '0 1 auto' : 'none', margin: 'auto' }}>
          {currentPosts.length > 0 ? (
            currentPosts.map(pokemon => (
              <PokemonCard pokemon={pokemon} key={pokemon.name} onClick={() => set_selected_pokemon(pokemon.name)} isActive={selected_pokemon == pokemon.name} />
            ))
          ) : (
            <p>No Pokemon found!</p>
          )}
        </div>
        {selected_pokemon &&
          <div className='selected-pokemon' style={{ display: selected_pokemon == "" ? 'none' : 'flex' }}>
            <SelectedPokemonCard pokemon={selected_pokemon} />
          </div>
        }

      </section>
      <section>
        <Pagination pokemonPerPage={pokemonPerPage} totalPokemons={pokemons.length}  setCurrentPage={setCurrentPage}/>
      </section>
    </main>
  )
}

export default Home
