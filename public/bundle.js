'use strict';

const cargarTitulo = (resultados) => {

    const contenedor = document.querySelector("#populares .main__grid");

    contenedor.innerHTML = "";

    resultados.forEach((resultado) => {

        const plantilla = `
        <div class="main__media" data-id="${resultado.id}">
            <a href="#" class="main__media-thumb">
                <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}" />
            </a>
            <p class="main__media-titulo">${resultado.title || resultado.name}</p>
            <p class="main__media-fecha">${resultado.genero}</p>
        </div>
    `;
    contenedor.insertAdjacentHTML("beforeend",plantilla);

    });
};

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

};

const contenedorGeneros = document.querySelector("#filtro-generos");

const cargarGeneros = async (filtro) => {

    contenedorGeneros.innerHTML = "";

    // Cargamos los generos para mostrarlos en los botones laterales
   const generos = await fetchGeneros(filtro);
   generos.forEach((genero) => {
    
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = genero.name;
    btn.setAttribute("data-id", genero.id);

    contenedorGeneros.append(btn);

   });
};

const obtenerGenero = (id, generos) => {

    // Obtenemos los nombres de los generos
    let nombre;

    generos.forEach((elemento) => {
        if (id === elemento.id) {
            nombre = elemento.name;
        }
    });

    return nombre;
};

const fetchPopulares = async (filtro = "movie") => {

    const tipo = filtro === "movie" ? "movie" : "tv";

    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=81ace7cb4fc0064c82fafa53656482eb&language=es-MX&page=1`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results;

        // obtengo los generos de todas las peliculas
        const generos = await fetchGeneros();
        resultados.forEach((resultado) => {
            
            // Creo una nueva propiedad "resultado.genero" para transcribirla dinamicamente en la plantilla y mostrar los generos en pantalla
            resultado.genero = obtenerGenero(resultado.genre_ids[0],generos);
        });

        return resultados;

    } catch (error) {
        console.log(error);
    }

};

const btnPeliculas = document.querySelector("#movie");
const btnSeries= document.querySelector("#tv");


// Trabajamos con el boton de peliculas
btnPeliculas.addEventListener("click", async (e) => {
    e.preventDefault();

    // cargamos los generos en la barra lateral izquierda 
    cargarGeneros("movie");

    // obtenemos los resultados
    const resultados = await fetchPopulares("movie");

    // los cargamos en el DOM (se muestran en pantalla)
    cargarTitulo(resultados);

    btnSeries.classList.remove("btn--active");
    btnPeliculas.classList.add("btn--active");
    document.querySelector("#populares .main__titulo").innerText = "Peliculas Populares";

});


// Trabajamos con el boton de Series
btnSeries.addEventListener("click", async (e) => {
    e.preventDefault();

    // cargamos los generos en la barra lateral izquierda 
    cargarGeneros("tv");

    // obtenemos los resultados
    const resultados = await fetchPopulares("tv");

    // los cargamos en el DOM (se muestran en pantalla)
    cargarTitulo(resultados);

    btnPeliculas.classList.remove("btn--active");
    btnSeries.classList.add("btn--active");
    document.querySelector("#populares .main__titulo").innerText = "Series Populares";
    
});

const generos = document.querySelector("#filtro-generos");

generos.addEventListener("click", (e) => {
    e.preventDefault();
    

    if(e.target.closest("button")){

        // Quitamos primero la clase para luego agregarsela al siguiente boton que clickemos
        // Con el simbolo "?" estamos preguntando si algun boton tiene la clase y si es asi la eliminamos
        generos.querySelector(".btn--active")?.classList.remove("btn--active");

        // Se le agrega la calss activa al nuevo boton que hemos clickeado.
        e.target.classList.add("btn--active");
    }
});

const fetchBuscar = async (pagina = 1) => {
    const tipo = document.querySelector(".main__filtros .btn--active").id;
    const idGeneros = document.querySelector("#filtro-generos .btn--active")?.dataset.id;
    const añoInicial = document.querySelector("#años-min").value || 1950;
    const añoFinal = document.querySelector("#años-max").value || 2024;

    let url;
    if (tipo === "movie") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=81ace7cb4fc0064c82fafa53656482eb&include_adult=false&include_video=false&language=es-MX&page=${pagina}&release_date.gte=${añoInicial}&release_date.lte=${añoFinal}&sort_by=popularity.desc&with_genres=${idGeneros}`;
    } else if (tipo === "tv"){
        url = `https://api.themoviedb.org/3/discover/tv?api_key=81ace7cb4fc0064c82fafa53656482eb&first_air_date.gte=${añoInicial}&first_air_date.lte=${añoFinal}&include_adult=false&include_null_first_air_dates=false&language=es-MX&page=${pagina}&sort_by=popularity.desc&timezone=America%2FNew_York&with_genres=${idGeneros}&with_watch_monetization_types=flatrate`;
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
        });

        return resultados;

    } catch (error) {
        console.log(error);
    }
};

const btnBuscar = document.querySelector("#btn-buscar");

btnBuscar.addEventListener("click", async (e) => {
    const resultados = await fetchBuscar();

    cargarTitulo(resultados);
});

const btnAnterior = document.querySelector("#pagina-anterior");
const btnSiguiente = document.querySelector("#pagina-siguiente");

btnSiguiente.addEventListener("click", async () => {
    const paginaActual = document.querySelector("#populares").dataset.pagina;
    document.querySelector("#populares").setAttribute("data-pagina", parseInt(paginaActual) + 1);

    try {
        const resultados = await fetchBuscar(paginaActual + 1);
        cargarTitulo(resultados);
        window.scrollTo(0,0);
    } catch (e) {
        console.log(e);
    }
});

btnAnterior.addEventListener("click", async () => {
    const paginaActual = document.querySelector("#populares").dataset.pagina;
    
    if (paginaActual > 1) {
         document.querySelector("#populares").setAttribute("data-pagina", parseInt(paginaActual) - 1);
        try {
            const resultados = await fetchBuscar(paginaActual - 1);
            cargarTitulo(resultados);
            window.scrollTo(0,0);
        } catch (e) {
            console.log(e);
        }
        }
});

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
};

const contenedor = document.querySelector("#populares");
const ventanaEmergente = document.querySelector("#media");

contenedor.addEventListener("click", async (e) => {
   if(e.target.closest(".main__media")) {
        ventanaEmergente.classList.add("media--active");

        const id = e.target.closest(".main__media").dataset.id;

        const resultado = await fetchItems(id);

        const plantilla = `
            <div class="media__backdrop">
            <img
                src="https://image.tmdb.org/t/p/w500//${resultado.backdrop_path}"
                class="media__backdrop-image"
            />
            </div>
            <div class="media__imagen">
                <img
                    src="https://image.tmdb.org/t/p/w500//${resultado.poster_path}.jpg"
                    class="media__poster"
                />
            </div>
            <div class="media__info">
                <h1 class="media__titulo">${resultado.title || resultado.name}</h1>
                <p class="media__fecha">${resultado.release_date || resultado.first_air_date}</p>
                <p class="media__overview">${resultado.overview}</p>
            </div>
            <button class="media__btn">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
					class="media__btn-icono"
				>
					<path
						d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
					/>
				</svg>
			</button>
        `;

        document.querySelector("#media .media__contenedor").innerHTML = plantilla;
   }

});

const cerrarInfo = document.querySelector("#media");

cerrarInfo.addEventListener("click", (e) => {
    if(e.target.closest("button")){
        cerrarInfo.classList.remove("media--active");
    }
});

const cargar = async () => {
    const resultados = await fetchPopulares();
    cargarTitulo(resultados);
    cargarGeneros("movie");
};
cargar();
//# sourceMappingURL=bundle.js.map
