import "../css/pokemonCard.css"

function PokemonCard({pokemon}){

    function onFavoriteClick(){
        alert("clicked")
    }

    return(
        <div className="pokemon-card">
            {/* <div className="pokemon-poster">
                <img src={`https://image.tmdb.org/t/p/w500${pokemon.poster_path}`} alt={pokemon.title} />
            </div> */}
            <div className="pokemon-info">
                <h3>{pokemon.name}  </h3>
            </div>
        </div>
    )
}

export default PokemonCard