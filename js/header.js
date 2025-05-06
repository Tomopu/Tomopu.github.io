document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    header.style.transition = 'top 0.2s ease';
    const headerHeight = header.offsetHeight;
    const main = document.getElementById('main');
    if (main) {
        main.style.marginTop = `${headerHeight}px`;
    }
    let previousScrollY = 0;

    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > previousScrollY && currentScrollY > headerHeight) {
            header.style.top = `-${headerHeight}px`;
        } else {
            header.style.top = '0';
        }

        previousScrollY = currentScrollY;
    }
});