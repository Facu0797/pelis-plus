const cerrarInfo = document.querySelector("#media");

cerrarInfo.addEventListener("click", (e) => {
    if(e.target.closest("button")){
        cerrarInfo.classList.remove("media--active");
    }
})