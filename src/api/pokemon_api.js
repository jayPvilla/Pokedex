const base_url = 'https://pokeapi.co/api/v2/pokemon/';

export const getPokemons = async () => {
    try {
        const response = await fetch(base_url)
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (e) {
        console.error(e)
    }
}

export const searchPokemons = async (pokemon) => {
    try {
        const response = await fetch(`${base_url}/${pokemon}`);
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (e){
        console.error(e)
    }
}