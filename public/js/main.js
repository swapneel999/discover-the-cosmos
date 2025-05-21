document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    fetch('/data/planets')
        .then(res => {
            console.log('Response received:', res);
            return res.json();
        })
        .then(data => {
            console.log('Data received:', data);
            renderPlanets(data);
        })
        .catch(err => console.error('Error loading JSON:', err));
});

function renderPlanets(planets) {
    console.log('Rendering planets:', planets);
    const container = document.getElementById('planet-container');
    console.log('Container element:', container);

    planets.forEach((planet, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
      <div class="card h-100" data-aos="fade-up" data-aos-delay="${index * 100}">
        <img src="${planet.image}" class="card-img-top" alt="${planet.name}" />
        <div class="card-body">
          <h5 class="card-title">${planet.name}</h5>
          <p class="card-text">${planet.description}</p>
        </div>
      </div>
    `;
        container.appendChild(card);
    });
}

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const sunIcon = themeToggle.querySelector('.sun-icon');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline';
    } else {
        moonIcon.style.display = 'inline';
        sunIcon.style.display = 'none';
    }

    // Toggle theme
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('night-mode');
        
        // Update icons
        if (document.body.classList.contains('night-mode')) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline';
            localStorage.setItem('theme', 'night');
        } else {
            moonIcon.style.display = 'inline';
            sunIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }
    });
});

// Solar System Interactions
document.addEventListener('DOMContentLoaded', function() {
    const planets = document.querySelectorAll('.planet');
    const solarSystemContainer = document.querySelector('.solar-system-container');

    // Planet click handler
    planets.forEach(planet => {
        planet.addEventListener('click', function() {
            const planetName = this.getAttribute('data-planet');
            // Scroll to the planet card
            const planetCard = document.querySelector(`.card[data-planet="${planetName}"]`);
            if (planetCard) {
                planetCard.scrollIntoView({ behavior: 'smooth' });
                // Highlight the card
                planetCard.classList.add('highlight');
                setTimeout(() => planetCard.classList.remove('highlight'), 2000);
            }
        });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const solarSystemSection = document.querySelector('.solar-system-section');
        const rect = solarSystemSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const planets = document.querySelectorAll('.planet');
            planets.forEach(planet => {
                const speed = planet.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                planet.style.transform = `translateY(${yPos}px)`;
            });
        }
    });
});