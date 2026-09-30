// Small sparkle burst wherever the page is clicked
document.addEventListener('click', function (e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#9AD1D4', '#003249', '#ffd166'];
    for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        const angle = (Math.PI * 2 * i) / 8;
        const dist = 18 + Math.random() * 14;
        s.className = 'sparkle';
        s.style.left = e.clientX + 'px';
        s.style.top = e.clientY + 'px';
        s.style.background = colors[i % colors.length];
        s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        document.body.appendChild(s);
        s.addEventListener('animationend', () => s.remove());
    }
});
