document.addEventListener("DOMContentLoaded", function () {
    const textoDinamico = document.querySelector(".texto-dinamico");
    const habilidades = textoDinamico.querySelectorAll("span");
    let index = 0;

    function mostrarSiguienteHabilidad() {
        habilidades[index].style.opacity = 0;
        habilidades[index].style.animation = "none"; // Detiene la animación actual
        index = (index + 1) % habilidades.length;
        habilidades[index].style.opacity = 1;
        habilidades[index].style.animation = "escribir 2s steps(40)"; // Aplica la animación de escritura
        setTimeout(mostrarSiguienteHabilidad, 5000);
    }
    habilidades[index].style.opacity = 1; // Muestra el primer texto
    habilidades[index].style.animation = "escribir 2s steps(40)"; // Aplica la animación de escritura
    setTimeout(mostrarSiguienteHabilidad, 5000); // Cambia al siguiente texto después de 5 segundos
});


let currentIndex = 0;
let intervalId;

function cambiarImagen(tipo, direction) {
    const container = document.querySelector(`.${tipo} .imagenes-container`);
    const images = container.querySelectorAll('.proyecto-imagen');
    const totalImages = images.length;

    // Calculamos el nuevo índice
    currentIndex = (currentIndex + direction + totalImages) % totalImages;

    // Aplicamos la transformación para mover las imágenes
    container.style.transition = "transform 0.5s ease-in-out";
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function iniciarCarrusel(tipo) {
    intervalId = setInterval(() => {
        cambiarImagen(tipo, 1); // Cambiar a la siguiente imagen cada 3 segundos
    }, 3000);
}

function detenerCarrusel() {
    clearInterval(intervalId); // Detener el carrusel
}

document.addEventListener('DOMContentLoaded', () => {
    const tipos = ['web', 'escritorio', 'movil']; // Tipos de proyectos

    tipos.forEach(tipo => {
        iniciarCarrusel(tipo); // Iniciar el carrusel automáticamente para cada tipo

        // Botones de navegación
        const prevButton = document.querySelector(`.${tipo} button.prev`);
        const nextButton = document.querySelector(`.${tipo} button.next`);

        prevButton.addEventListener('click', () => {
            detenerCarrusel(); // Detener el carrusel al interactuar manualmente
            cambiarImagen(tipo, -1); // Ir a la imagen anterior
        });

        nextButton.addEventListener('click', () => {
            detenerCarrusel(); // Detener el carrusel al interactuar manualmente
            cambiarImagen(tipo, 1); // Ir a la siguiente imagen
        });

        // Reiniciar el carrusel después de la interacción manual
        prevButton.addEventListener('mouseleave', () => iniciarCarrusel(tipo));
        nextButton.addEventListener('mouseleave', () => iniciarCarrusel(tipo));
    });
});

