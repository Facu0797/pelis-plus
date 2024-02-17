import cargarTitulo from "./ cargarTitulo";
import fetchBuscar from "./fetchBusqueda";

const btnBuscar = document.querySelector("#btn-buscar");

btnBuscar.addEventListener("click", async (e) => {
    const resultados = await fetchBuscar();

    cargarTitulo(resultados)
})