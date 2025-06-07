// Esconder el menu
const menu = document.getElementById('menu_skeet');

document.addEventListener('keydown', function(e) {
    if (e.key === 'Insert' || e.code === 'Insert') {
        menu.classList.toggle('oculto');
    }
});

// Sistema de navegación por pestañas
const tabButtons = document.querySelectorAll('.tab-button');
const sections = document.querySelectorAll('.section');

// Función para cambiar de sección
function switchSection(targetSection) {
    // Remover clase active de todas las pestañas y secciones
    tabButtons.forEach(button => button.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    // Agregar clase active a la pestaña clickeada
    const activeButton = document.querySelector(`[data-section="${targetSection}"]`);
    const activeSection = document.getElementById(`${targetSection}-section`);
    
    if (activeButton && activeSection) {
        activeButton.classList.add('active');
        activeSection.classList.add('active');
    }
}

// Event listeners para las pestañas
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-section');
        switchSection(targetSection);
    });
});

// Navegación con teclado (opcional)
document.addEventListener('keydown', function(e) {
    const currentActiveButton = document.querySelector('.tab-button.active');
    const currentIndex = Array.from(tabButtons).indexOf(currentActiveButton);
    
    if (e.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
        const nextSection = tabButtons[currentIndex + 1].getAttribute('data-section');
        switchSection(nextSection);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const prevSection = tabButtons[currentIndex - 1].getAttribute('data-section');
        switchSection(prevSection);
    }
});

// Sistema de arrastre (tu código existente)
const draggableElement = document.getElementById('menu_skeet');
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

// Sistema de redimensionado
const resizer = document.querySelector('.resizer');
let isResizing = false;
let resizeStart = { w: 0, h: 0, x: 0, y: 0 };

// Event listeners
draggableElement.addEventListener('mousedown', startDrag);
resizer.addEventListener('mousedown', startResize);
document.addEventListener('mouseup', stopInteractions);
document.addEventListener('mousemove', handleMovement);

function startDrag(e) {
    if (e.target === resizer || e.target.classList.contains('tab-button')) return;
    isDragging = true;
    dragOffset = {
        x: e.clientX - draggableElement.offsetLeft,
        y: e.clientY - draggableElement.offsetTop
    };
    draggableElement.style.cursor = 'grabbing';
}

function startResize(e) {
    e.preventDefault();
    isResizing = true;
    resizeStart = {
        w: draggableElement.offsetWidth,
        h: draggableElement.offsetHeight,
        x: e.clientX,
        y: e.clientY
    };
}

function handleMovement(e) {
    if (isDragging) drag(e);
    if (isResizing) resize(e);
}

function drag(e) {
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    const maxX = window.innerWidth - draggableElement.offsetWidth;
    const maxY = window.innerHeight - draggableElement.offsetHeight;
    
    draggableElement.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
    draggableElement.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
}

function resize(e) {
    const newWidth = resizeStart.w + (e.clientX - resizeStart.x);
    const newHeight = resizeStart.h + (e.clientY - resizeStart.y);
    
    draggableElement.style.width = `${Math.max(400, Math.min(newWidth, 1200))}px`;
    draggableElement.style.height = `${Math.max(400, Math.min(newHeight, 1000))}px`;
}

function stopInteractions() {
    isDragging = false;
    isResizing = false;
    draggableElement.style.cursor = 'grab';
}


//Reproductor de musica:
const tituloCancion = document.querySelector('.menu-item-music h3');
const nombreArtista = document.querySelector('.menu-item-music p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const inconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.getElementById('botonReproducirPausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

const canciones =[
    {
        titulo:'Skeet Song',
        nombre:' gamesense enjoyer',
        fuente:'resources/songs/skeet.mp3'
    }
];
let indiceCancionActual = 0;
function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente
    cancion.addEventListener('loadeddata', function(){})

};
botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar() {
    if (cancion.paused) {
        reproducirCancion();
        inconoControl.classList.add('bi-pause-fill')
        inconoControl.classList.remove('bi-play-fill')
    } else {
        pausarCancion();
        inconoControl.classList.remove('bi-pause-fill')
        inconoControl.classList.add('bi-play-fill')
        
    }
}

function reproducirCancion() {
    cancion.play();
}

function pausarCancion() {
    cancion.pause();
}

actualizarInfoCancion();
