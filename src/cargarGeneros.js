import fetchGeneros from "./fetchGeneros";
const contenedorGeneros = document.querySelector("#filtro-generos");

const cargarGeneros = async (filtro) => {

    contenedorGeneros.innerHTML = "";

    // Cargamos los generos para mostrarlos en los botones laterales
   const generos = await fetchGeneros(filtro);
   generos.forEach((genero) => {
    
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = genero.name;
    btn.setAttribute("data-id", genero.id)

    contenedorGeneros.append(btn);

   });
}

export default cargarGeneros;