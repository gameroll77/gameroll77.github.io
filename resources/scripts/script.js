document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('intro-music');
    
    startButton.addEventListener('click', function() {
        music.play();  // Reproduce la música
        introScreen.style.opacity = 0;
        setTimeout(function() {
            introScreen.style.display = 'none';
            mainContent.classList.add('show-content');
        }, 2000);
    });
});
