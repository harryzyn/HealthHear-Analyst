document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    // --- SETUP SMOOTH SCROLLING ---
    const lenis = new Lenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // --- FUNGSI & ANIMASI PARTIKEL LATAR ---
    const particleContainer = document.getElementById('particle-container');
    for (let i = 0; i < 50; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        gsap.set(particle, { x: gsap.utils.random(0, window.innerWidth), y: gsap.utils.random(0, document.body.scrollHeight), scale: gsap.utils.random(0.5, 2.0), opacity: gsap.utils.random(0.1, 0.4) });
        particleContainer.appendChild(particle);
    }
    gsap.to(".particle", { y: (i, target) => -document.body.scrollHeight * gsap.getProperty(target, "scale"), ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1.5 } });

    // --- FUNGSI PEMBUNGKUS AMAN UNTUK ANIMASI ---
    function safeAnimate(animationFunction) {
        try { animationFunction(); } catch (e) { console.error("Animasi gagal:", e); }
    }

    // --- SCENE 0: SOUND WAVE ---
    safeAnimate(() => {
        const waveContainer = document.getElementById('audio-wave-bg');
        for (let i = 0; i < 100; i++) { waveContainer.appendChild(document.createElement('div')).classList.add('wave-line'); }
        anime({ targets: '.wave-line', height: [0, '80%'], duration: () => anime.random(1000, 2500), delay: anime.stagger(20, {from: 'center'}), easing: 'easeInOutSine', direction: 'alternate', loop: true });
        gsap.from("#scene0 .prolog-title", { opacity: 0, y: 50, duration: 1.5 });
        gsap.from("#scene0 .prolog-text", { opacity: 0, y: 50, duration: 1.5, delay: 0.5 });
    });

    // --- SCENE 1: ANIMASI UTAMA & LATAR ---
    safeAnimate(() => {
        gsap.from(".hour-block", { scrollTrigger: { trigger: "#scene1", start: "top center", toggleActions: "play none none none" }, opacity: 0, y: 50, stagger: 0.25, duration: 0.8, ease: "back.out(1.7)" });
        const scene1BG = document.getElementById('scene1-bg');
        for (let i = 0; i < 3; i++) {
            let circle = document.createElement('div');
            circle.classList.add('circle-path');
            scene1BG.appendChild(circle);
            gsap.set(circle, { left: '50%', top: '50%', xPercent: -50, yPercent: -50, width: `${(i + 1) * 25}vmax`, height: `${(i + 1) * 25}vmax` });
            gsap.to(circle, { rotation: (i % 2 == 0 ? 360 : -360), scrollTrigger: { trigger: "#scene1", scrub: 2 }, ease: "none" });
        }
    });

    // --- SCENE 2: ANIMASI UTAMA & LATAR ---
    safeAnimate(() => {
        gsap.timeline({ scrollTrigger: { trigger: "#scene2", start: "top center", end: "center center", scrub: 1 } })
            .to(".head-icon path", { fill: "var(--discomfort-color)" })
            .to(".discomfort-glow", { opacity: 0.7, scale: 1.2 }, 0);
        const scene2BG = document.getElementById('scene2-bg');
        let pulse = document.createElement('div');
        pulse.classList.add('sonar-pulse');
        scene2BG.appendChild(pulse);
        gsap.fromTo(pulse, { scale: 0, opacity: 0.5 }, { scale: 10, opacity: 0, duration: 4, repeat: -1, ease: "power1.out" });
    });

    // --- SCENE 3: ANIMASI UTAMA & LATAR ---
    safeAnimate(() => {
        gsap.to(["#card-biaya", "#card-waktu"], { scrollTrigger: { trigger: ".barrier-cards", start: "top 60%", end: "top 30%", scrub: 1 }, opacity: 0.4, filter: "blur(1px)", scale: 0.95 });
        const scene3BG = document.getElementById('scene3-bg');
        for (let i = 0; i < 5; i++) {
            let plane = document.createElement('div');
            plane.classList.add('geo-plane');
            gsap.set(plane, { width: gsap.utils.random(20, 40) + 'vw', height: gsap.utils.random(20, 40) + 'vh', top: gsap.utils.random(-10, 90) + '%', left: gsap.utils.random(-10, 90) + '%', rotation: gsap.utils.random(0, 45) });
            scene3BG.appendChild(plane);
            gsap.to(plane, { x: gsap.utils.random(-100, 100), y: gsap.utils.random(-100, 100), rotation: gsap.utils.random(-45, 45), scrollTrigger: { trigger: "#scene3", scrub: 1.5 } });
        }
    });

    // --- SCENE 4: ANIMASI UTAMA & LATAR ---
    safeAnimate(() => {
        new Chart(document.getElementById('genZChart').getContext('2d'), { type: 'doughnut', data: { labels: ['Gen Z (18-24)', 'Generasi Lain'], datasets: [{ data: [73.8, 26.2], backgroundColor: ['#00BFFF', '#333'], borderColor: '#121212', borderWidth: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false } } } });
        gsap.to("#genz-percentage", { textContent: 74, duration: 2, ease: "power1.in", snap: { textContent: 1 }, scrollTrigger: { trigger: "#scene4", start: "top center" } });
        const scene4BG = document.getElementById('scene4-bg');
        for (let i = 0; i < 225; i++) {
            let dot = document.createElement('div');
            dot.classList.add('data-dot');
            gsap.set(dot, { width: gsap.utils.random(2, 5), height: gsap.utils.random(2, 5) });
            if (Math.random() < 0.74) dot.dataset.genz = "true";
            scene4BG.appendChild(dot);
        }
        ScrollTrigger.create({ trigger: "#scene4", start: "top center", end: "bottom center", onToggle: self => gsap.to('[data-genz="true"]', { backgroundColor: self.isActive ? 'var(--accent-color)' : '#333' }) });
    });

    // --- SCENE 5: ANIMASI LATAR & MODAL ---
    safeAnimate(() => {
        const svgNS = "http://www.w3.org/2000/svg";
        const scene5BG = document.getElementById('scene5-bg');
        const svg = document.createElementNS(svgNS, "svg");
        scene5BG.appendChild(svg);
        const nodes = [];
        for (let i = 0; i < 20; i++) {
            const circle = document.createElementNS(svgNS, 'circle');
            const node = { x: Math.random() * 100, y: Math.random() * 100, element: circle };
            gsap.set(circle, { attr: { cx: `${node.x}%`, cy: `${node.y}%`, r: 1 } });
            svg.appendChild(circle);
            nodes.push(node);
        }
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const line = document.createElementNS(svgNS, "line");
                gsap.set(line, { attr: { x1: `${nodes[i].x}%`, y1: `${nodes[i].y}%`, x2: `${nodes[j].x}%`, y2: `${nodes[j].y}%` }, opacity: 0.1 });
                svg.prepend(line);
            }
        }
        ScrollTrigger.create({ trigger: "#scene5", start: "top 80%", end: "bottom 20%", onToggle: self => gsap.to(svg.querySelectorAll('line'), { opacity: self.isActive ? 0.3 : 0.1, stagger: 0.001 }) });
    });
    
    // --- MODAL & CHARTS (TETAP SAMA) ---
    const modals = document.querySelectorAll('.modal');
    document.querySelectorAll('.explore-card').forEach(card => { card.addEventListener('click', () => { document.getElementById(card.getAttribute('data-modal')).style.display = 'flex'; }); });
    document.querySelectorAll('.close-button').forEach(button => { button.addEventListener('click', () => { button.closest('.modal').style.display = 'none'; }); });
    window.addEventListener('click', (event) => { modals.forEach(modal => { if (event.target == modal) { modal.style.display = 'none'; } }); });
    new Chart(document.getElementById('motivasiChart').getContext('2d'), { type: 'bar', data: { labels: ['<1 jam', '1-2 jam', '2-4 jam', '>4 jam'], datasets: [ { label: 'Hiburan (Ada Nyeri)', data: [32, 26, 24, 15], backgroundColor: '#00BFFF', }, { label: 'Fokus (Ada Nyeri)', data: [28, 21, 21, 5], backgroundColor: '#007f9f', } ] }, options: { indexAxis: 'y', scales: { x: { stacked: true }, y: { stacked: true } } } });
    new Chart(document.getElementById('segmentasiChart').getContext('2d'), { type: 'bar', data: { labels: ['Tes Cepat', 'Konsul Dokter', 'Kalibrasi Earphone', 'Pengingat Tes', 'Interaksi Game'], datasets: [ { label: 'Ada Nyeri', data: [142, 99, 95, 87, 88], backgroundColor: '#00BFFF', }, { label: 'Tanpa Nyeri', data: [87, 66, 50, 49, 62], backgroundColor: '#555', } ] } });
    new Chart(document.getElementById('fomoChart').getContext('2d'), { type: 'bar', data: { labels: ['Tidak Pernah', 'Jarang', 'Kadang-kadang', 'Sering'], datasets: [ { label: 'Tertarik dg App ("Yes")', data: [24, 31, 54, 24], backgroundColor: '#00BFFF', }, { label: 'Mungkin ("Maybe")', data: [38, 52, 74, 11], backgroundColor: '#007f9f', }, { label: 'Tidak Tertarik ("No")', data: [31, 20, 19, 4], backgroundColor: '#555', } ] } });
});