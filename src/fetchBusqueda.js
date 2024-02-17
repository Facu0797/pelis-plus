import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";

const fetchBuscar = async (pagina = 1) => {
    const tipo = document.querySelector(".main__filtros .btn--active").id;
    const idGeneros = document.querySelector("#filtro-generos .btn--active")?.dataset.id;
    const añoInicial = document.querySelector("#años-min").value || 1950;
    const añoFinal = document.querySelector("#años-max").value || 2024;

    let url;
    if (tipo === "movie") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=81ace7cb4fc0064c82fafa53656482eb&include_adult=false&include_video=false&language=es-MX&page=${pagina}&release_date.gte=${añoInicial}&release_date.lte=${añoFinal}&sort_by=popularity.desc&with_genres=${idGeneros}`;
    } else if (tipo === "tv"){
        url = `https://api.themoviedb.org/3/discover/tv?api_key=81ace7cb4fc0064c82fafa53656482eb&first_air_date.gte=${añoInicial}&first_air_date.lte=${añoFinal}&include_adult=false&include_null_first_air_dates=false&language=es-MX&page=${pagina}&sort_by=popularity.desc&timezone=America%2FNew_York&with_genres=${idGeneros}&with_watch_monetization_types=flatrate`
    }

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results;

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

export default fetchBuscar;