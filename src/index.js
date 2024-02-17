import cargarTitulo from "./ cargarTitulo";
import cargarGeneros from "./cargarGeneros";
import fetchPopulares from "./fetchPopulares";
import "./filtroPeliculasSeries";
import "./botonesGeneros";
import "./botonBuscar";
import "./paginacion";
import "./informacionItems";
import "./cerrarVentanaEmergente";

const cargar = async () => {
    const resultados = await fetchPopulares();
    cargarTitulo(resultados);
    cargarGeneros("movie");
}
cargar()