const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const particles = [];

function buildParticles() {

    particles.length = 0;

    const count = Math.min(120, Math.floor((width * height) / 20000));

    for (let i = 0; i < count; i++) {

        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: Math.random() * 1.8 + 0.6,
            pulseOffset: Math.random() * Math.PI * 2
        });

    }

}


function resize() {

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    buildParticles();

}


window.addEventListener("resize", resize);

buildParticles();


function step(time) {

    ctx.clearRect(0, 0, width, height);

    particles.forEach(particle => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

    });

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const a = particles[i];
            const b = particles[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {

                ctx.strokeStyle =
                    `rgba(0, 255, 136, ${0.12 * (1 - distance / 130)})`;

                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();

            }

        }

    }

    particles.forEach(particle => {

        const pulse =
            Math.sin(time / 900 + particle.pulseOffset) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(0, 255, 136, ${pulse})`;
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur = 8;

        ctx.fill();

    });

    requestAnimationFrame(step);

}

requestAnimationFrame(step);
