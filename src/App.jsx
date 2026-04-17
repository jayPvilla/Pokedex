import { useState, useEffect } from 'react'
import './App.css';
import PokemonCard from './components/PokemonCard';
import SelectedPokemonCard from './components/SelectedPokemonCard';
import { getPokemons,
        searchPokemons,
        get_types_of_pokemons,
        getPokemonsOfSpecificType,
        getDetailsOfSelectedType } 
  from './api/pokemon_api';

function App() {
  const [pokemons, set_pokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [types, set_types] = useState([])
  const [filter_type, set_filter_type] = useState("All")
  const [searched_pokemon, set_searched_pokemon] = useState("")
  const [selected_pokemon, set_selected_pokemon] = useState("")


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

  const TypeButton = ({ type, isActive, onClick, get_filter_value, getDetailsOfSelectedType }) => {
    const [iconUrl, setIconUrl] = useState(null);

    useEffect(() => {
      if (type.name !== "all") {
        const typeId = get_filter_value(type.url);
        getDetailsOfSelectedType(typeId).then(data => {
          // Accessing the specific path you requested
          const sprite = data[0].sprites['generation-viii']['brilliant-diamond-shining-pearl'].symbol_icon;
          setIconUrl(sprite);
        });
      }
    }, [type]);

    return (
      <button className={isActive ? 'active-filter' : 'type-header'} onClick={onClick}>
        {iconUrl && <img src={iconUrl} alt="" style={{width: '20px', marginRight: '5px'}} className='type_image'/>}
        {type.name}
      </button>
    );
  };

  return (
    <main className='main-content'>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'sticky'}}>
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

        <div className="types-container">
          {types.map(type => {

            const typeId = get_filter_value(type.url);
            const isActive = (type.name === "all" && filter_type === "All") || (filter_type === typeId);

            const detail_of_type = async (typeId) => await getDetailsOfSelectedType(typeId);

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
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', minWidth: '90%', alignItems: 'flex-start'}}>
        <div className='container-pokemons'>
          {pokemons.length > 0 ? (
            pokemons.map(pokemon => (
              <PokemonCard pokemon={pokemon} key={pokemon.name} onClick={() => set_selected_pokemon(pokemon.name)}/>
            ))
          ) : (
            <p>No Pokemon found!</p>
          )}
        </div>

        <div className='selected-pokemon'>
            <SelectedPokemonCard pokemon={selected_pokemon}/>
        </div>
      </div>
    </main>
  )
}

export default App
