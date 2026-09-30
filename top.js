// Every page opens at the very top (except links to a section like #contact)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (!location.hash || location.hash === '#top') window.scrollTo(0, 0);

// "#top" links (logo, About Me) glide to the very top when already on the page
document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href$="#top"]');
    if (!link) return;
    const url = new URL(link.href);
    if (url.pathname === location.pathname || (location.pathname.endsWith('/') && url.pathname.endsWith('/index.html'))) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', '#top');
    }
});
