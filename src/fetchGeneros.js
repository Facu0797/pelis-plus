const fetchGeneros = async (filtro = "movie") => {

    const tipo = filtro === "movie" ? "movie" : "tv";

    // Peticion de generos al servidor
    const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=81ace7cb4fc0064c82fafa53656482eb&language=es-MX&page=1`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        return datos.genres

    } catch (error) {
        console.log(error);
    }

}

export default fetchGeneros;