// Simple particle background
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-9999';
    document.body.appendChild(canvas);

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;
    const mouse = { x: width / 2, y: height / 2, radius: 100 };

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = getComputedStyle(document.documentElement).getPropertyValue('--main_text_color').trim() || '#333333';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > width) this.x = 0;
            else if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            else if (this.y < 0) this.y = height;
            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                this.speedX += dx * 0.001;
                this.speedY += dy * 0.001;
                // limit speed
                const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
                if (speed > 1) {
                    this.speedX = this.speedX / speed;
                    this.speedY = this.speedY / speed;
                }
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    });

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    init();
    animate();
});