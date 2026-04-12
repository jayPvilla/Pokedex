export const base_url = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemons = async () => {
    try {
        const response = await fetch(`${base_url}?limit=1000`)
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (e) {
        console.error(e)
    }
}

export const searchPokemons = async (pokemon) => {
    try {
        if (!pokemon) return []; 
        
        const response = await fetch(`${base_url}/${pokemon.toLowerCase()}`);
        const data = await response.json();
        
        console.log(data);
        return [data]; 
    } catch (e) {
        console.error("Pokemon not found:", e);
        return [];
    }
}

export const getPokemonsByType = async (type) => {
    try {
         const response = await fetch(`https://pokeapi.co{type.toLowerCase()}`);
        const data = await response.json();
        // The API returns an array of objects: { pokemon: { name, url }, slot }
        // We map it to match your existing [{ name, url }] format
        return data.pokemon.map(p => p.pokemon);
    } catch (e) {
        console.error("Error fetching types:", e);
        return [];
    }
};
