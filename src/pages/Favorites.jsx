import React from 'react'
import { getPokemons, searchPokemons, base_url } from "../services/pokemon_api"
import PokemonCard from '../components/PokemonCard';
import SelectedPokemonCard from '../components/SelectedPokemonCard';
import { FavoriteContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {

  const { favorites, setFavorites }  = useContext(FavoriteContext)
  const [selected_pokemon, set_selected_pokemon] = useState("")

  return (
    <main className='main-content'>
      <div style={{ display: 'flex', justifyContent: selected_pokemon ? 'space-between' : 'center', position: 'relative', minWidth: '100%', alignItems: 'flex-start', flex: 1, overflowY: 'auto', maxHeight: '100%'}}>
        
        <div className='container-pokemons' style={{ flex: selected_pokemon ? '0 1 auto' : 'none', margin: 'auto'}}>
          {favorites.length > 0 ? (
            favorites.map(pokemon => (
              <PokemonCard pokemon={pokemon} key={pokemon.name} onClick={() => set_selected_pokemon(pokemon.name)} isActive={selected_pokemon == pokemon.name} />
            ))
          ) : (
            <p>No Pokemon found!</p>
          )}
        </div>

        {selected_pokemon && 
          <div className='selected-pokemon' style={{ display: selected_pokemon == "" ? 'none' : 'flex'}}>
            <SelectedPokemonCard pokemon={selected_pokemon} />
          </div>
        }

      </div>
    </main>
  )
}

export default Favorites
