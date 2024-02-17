import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";

const fetchPopulares = async (filtro = "movie") => {

    const tipo = filtro === "movie" ? "movie" : "tv";

    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=81ace7cb4fc0064c82fafa53656482eb&language=es-MX&page=1`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results

        // obtengo los generos de todas las peliculas
        const generos = await fetchGeneros();
        resultados.forEach((resultado) => {
            
            // Creo una nueva propiedad "resultado.genero" para transcribirla dinamicamente en la plantilla y mostrar los generos en pantalla
            resultado.genero = obtenerGenero(resultado.genre_ids[0],generos);
        })

        return resultados;

    } catch (error) {
        console.log(error);
    }

}

export default fetchPopulares