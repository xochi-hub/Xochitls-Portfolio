// Enlarged photos: swipe left/right on touch screens to step through them, same as the lightbox arrows
(function () {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    let startX = null, startY = 0;
    lightbox.addEventListener('touchstart', e => {
        const t = e.touches[0];
        startX = e.touches.length === 1 ? t.clientX : null;
        startY = t.clientY;
    }, { passive: true });
    lightbox.addEventListener('touchend', e => {
        if (startX === null) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX, dy = t.clientY - startY;
        startX = null;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        // Swipe left shows the next photo, swipe right the previous one; skipped when the arrows are hidden (single photo)
        const btn = lightbox.querySelector(dx < 0 ? '.lightbox-next' : '.lightbox-prev');
        if (btn && btn.style.display !== 'none') btn.click();
    });
})();
