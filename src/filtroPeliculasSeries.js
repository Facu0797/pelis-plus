import cargarTitulo from "./ cargarTitulo";
import cargarGeneros from "./cargarGeneros";
import fetchPopulares from "./fetchPopulares";

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

})


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
    
})