window.addEventListener('scroll', revealSections);

function revealSections() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 90; // ظهور أسرع ومناسب للموبايل السريع

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    revealSections();
});

particlesJS("particles-js", {
    "particles": {
        "number": { "value": 50, "density": { "enable": true, "value_area": 700 } },
        "color": { "value": "#a855f7" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.2, "random": true },
        "size": { "value": 2.5, "random": true },
        "line_linked": { "enable": true, "distance": 130, "color": "#3b82f6", "opacity": 0.08, "width": 1 },
        "move": { "enable": true, "speed": 1.2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" } },
        "modes": { "grab": { "distance": 130, "line_linked": { "opacity": 0.3 } } }
    },
    "retina_detect": true
});