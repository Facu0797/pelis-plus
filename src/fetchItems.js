const fetchItems = async(id) => {
    const tipo = document.querySelector(".main__filtros .btn--active").id;

    try {
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=81ace7cb4fc0064c82fafa53656482eb&language=es-MX`;

        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos

    } catch (e) {
        console.log(e);
    }
}

export default fetchItems