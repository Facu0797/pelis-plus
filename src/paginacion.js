import cargarTitulo from "./ cargarTitulo";
import fetchBuscar from "./fetchBusqueda";

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
})

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
})

