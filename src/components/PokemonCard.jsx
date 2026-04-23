import "../css/PokemonCard.css"
import { getPokemons, searchPokemons, base_url } from "../services/pokemon_api"
import { useState, useEffect, useContext } from "react";

function PokemonCard({ pokemon, onClick, isActive }) {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const dataArray = await searchPokemons(pokemon.name);
                const sprite = dataArray[0].sprites.front_default;
                setImageUrl(sprite);
            } catch (err) {
                console.error("Error loading image", err);
            }
        };

        fetchImage();
    }, [pokemon.name]);

    return (
        <div className="pokemon-card" onClick={onClick} style={{ background: isActive ? 'yellow' : 'rgba(255, 255, 255, 0.7)' }}>
            <div className="pokemon-poster">
                <img src={imageUrl} alt={pokemon.name} />
            </div>
            <div className="pokemon-info">
                <h3>{pokemon.name.toUpperCase()}  </h3>
            </div>
        </div>
    )
}

export default PokemonCard