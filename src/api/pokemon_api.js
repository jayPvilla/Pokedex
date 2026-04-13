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
        // Returns [data] so App.js can still use .map() on it
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
        // Fix: Return the results array, not the whole data object
        return data.results; 
    } catch (e) {
        console.error("Error fetching types:", e);
        return [];
    }
};
