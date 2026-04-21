import "../css/SelectedPokemonCard.css"
import { getPokemons, searchPokemons, base_url } from "../api/pokemon_api"
import { FavoriteContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function SelectedPokemonCard({ pokemon }) {
    const [details, setDetails] = useState(null);
    const { favorites, setFavorites }  = useContext(FavoriteContext)

    const isFavorite = favorites.some(fav => fav.name === pokemon);

    const onFavoriteClick = (e) => {
        e.preventDefault();
        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav.name !== pokemon));
        } else {
            setFavorites([...favorites, { 
                name: pokemon, 
                image: details.sprites.other.home.front_default 
            }]);
        }
    };

    useEffect(() => {
        if (!pokemon) return; 

        const fetchImage = async () => {
            try {
                const dataArray = await searchPokemons(pokemon);
                const data = dataArray[0];
                
                setDetails(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchImage();
    }, [pokemon]);

    if (!details) return null;

    return (
        <div className="pokemon-selected-card">
             <div className={`heart-container ${isFavorite ? "active" : ""}`} onClick={onFavoriteClick}>
                {isFavorite ? <FaHeart className="heart active-heart" /> : <CiHeart className="heart inactive-heart" />}
            </div>
            <div className="pokemon-selected-poster">
                <img src={details.sprites.other.home.front_default} alt={pokemon}/>
            </div>
            <div className="pokemon-selected-info">
                <h1 style={{ textTransform: 'capitalize' }}>{pokemon}</h1>
                <h3>Type</h3>
                <ul>
                    {details.types.map((p, index) => (
                        <li key={index}>{p.type.name}</li>
                    ))}
                </ul>
                <h3>Abilities</h3>
                <ul>
                    {details.abilities.map((p, index) => (
                        <li key={index}>{p.ability.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default SelectedPokemonCard