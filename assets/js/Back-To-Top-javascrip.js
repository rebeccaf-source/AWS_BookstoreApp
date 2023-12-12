document.getElementById("topButton").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

(function() {
    'use strict';

    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener);
    };

    let backtotop = select('.back-to-top');
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.style.bottom = '20px'; // Mostra o botão de forma suave
            } else {
                backtotop.style.bottom = '-60px'; // Esconde o botão de forma suave
            }
        };

        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }
})();
