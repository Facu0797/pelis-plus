const generos = document.querySelector("#filtro-generos");

generos.addEventListener("click", (e) => {
    e.preventDefault();
    

    if(e.target.closest("button")){

        // Quitamos primero la clase para luego agregarsela al siguiente boton que clickemos
        // Con el simbolo "?" estamos preguntando si algun boton tiene la clase y si es asi la eliminamos
        generos.querySelector(".btn--active")?.classList.remove("btn--active")

        // Se le agrega la calss activa al nuevo boton que hemos clickeado.
        e.target.classList.add("btn--active");
    }
})