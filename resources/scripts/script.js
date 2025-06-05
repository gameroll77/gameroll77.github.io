//Esconder el menu: 
const menu = document.getElementById('menu_skeet');

document.addEventListener('keydown', function(e) {
    // 'Insert' puede ser detectado por e.key === 'Insert' o e.code === 'Insert'
    if (e.key === 'Insert' || e.code === 'Insert') {
        menu.classList.toggle('oculto');
    }
});


// Sistema de arrastre
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
    if (e.target === resizer) return;
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
