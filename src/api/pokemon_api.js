export const base_url = 'https://pokeapi.co/api/v2';

export const getPokemons = async () => {
    try {
        const response = await fetch(`${base_url}/pokemon?limit=1000`)
        const data = await response.json();
        return data.results; // Returns array of { name, url }
    } catch (e) {
        console.error(e)
        return [];
    }
}

export const searchPokemons = async (pokemon) => {
    try {
        if (!pokemon) return []; 
        const response = await fetch(`${base_url}/pokemon/${pokemon.toLowerCase()}`);
        
        if (!response.ok) throw new Error("Pokemon not found");

        const data = await response.json();
        
        return [data]; 
    } catch (e) {
        console.error("Search error:", e);
        return [];
    }
}

export const getPokemonsByType = async () => {
    try {
        const response = await fetch(`${base_url}/type`);
        const data = await response.json();
        
        data.results.unshift({
            "name": "all",
            "url": "none"
        });

        data.results.splice(-2, 2);

        return data.results; 
    } catch (e) {
        console.error("Error fetching types:", e);
        return [];
    }
};


export const getPokemonsOfSpecificType = async (selected_type) => {
   try {
        const response = await fetch(`${base_url}/type/${selected_type}`);
        const data = await response.json();
        
        return data.pokemon.map(poke => poke.pokemon); 
    } catch (e) {
        console.error("Error fetching types:", e);
        return [];
    } 
}
