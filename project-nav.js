// Project pages: arrows on the left/right edges step through the projects in the Experience page's order
(function () {
    const pages = [
        ['soft-wearables-menopause-fatigue', 'Soft Wearables for Menopause Fatigue'],
        ['robogatchi', 'Robogatchi'],
        ['self-actuating-sequins', 'Self-actuating Sequins'],
        ['stride-recover', 'Stride Recover'],
        ['medical-device-equity', 'Medical Device Equity in Low-Resource Analysis'],
        ['biofilm-mechanics', 'Biofilm Mechanics Blocking Tissue Repair'],
        ['gyroscope-glove', 'Gyroscope Glove'],
        ['formaflow', 'Formaflow'],
        ['bahawatch', 'BahaWatch'],
        ['polyurethane-foam-study', 'Environmental Degradation of PE-PUR Foam in Respiratory Devices'],
        ['echohand', 'EchoHand'],
        ['direct-joule-synthesis', 'Direct Joule Synthesis'],
        ['loreal', 'Loreal'],
        ['spacex-starship-analysis', 'Analysis of SpaceX Starship Model'],
        ['iot-cup-pong', 'IoT Cup Pong'],
        ['ai-ml-star-predictor', 'AI/ML Star Predictor']
    ];
    const slug = location.pathname.split('/').pop().replace(/\.html$/, '');
    const i = pages.findIndex(p => p[0] === slug);
    if (i === -1) return;

    function arrow(page, side, symbol) {
        const a = document.createElement('a');
        a.className = 'project-nav project-nav-' + side;
        a.href = page[0] + '.html';
        a.setAttribute('aria-label', (side === 'prev' ? 'Previous project: ' : 'Next project: ') + page[1]);
        a.innerHTML = '<span class="project-nav-arrow">' + symbol + '</span><span class="project-nav-label">' + page[1] + '</span>';
        document.body.appendChild(a);
    }
    const prev = pages[(i - 1 + pages.length) % pages.length];
    const next = pages[(i + 1) % pages.length];
    const chevron = d => '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>';
    arrow(prev, 'prev', chevron('M15 5l-7 7 7 7'));
    arrow(next, 'next', chevron('M9 5l7 7-7 7'));

    const go = page => { location.href = page[0] + '.html'; };
    const lightboxOpen = () => document.querySelector('.lightbox.open');

    // Left/right arrow keys flip pages, like the camera roll (the photo lightbox keeps them while it's open)
    document.addEventListener('keydown', e => {
        if (lightboxOpen() || e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === 'ArrowLeft') go(prev);
        if (e.key === 'ArrowRight') go(next);
    });

    // Horizontal swipe on touch screens, ignoring swipes that start on the photos
    let startX = null, startY = 0;
    document.addEventListener('touchstart', e => {
        const t = e.touches[0];
        startX = (e.touches.length === 1 && !lightboxOpen() && !e.target.closest('.project-carousel')) ? t.clientX : null;
        startY = t.clientY;
    }, { passive: true });
    document.addEventListener('touchend', e => {
        if (startX === null) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX, dy = t.clientY - startY;
        startX = null;
        if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2) go(dx > 0 ? prev : next);
    });
})();
