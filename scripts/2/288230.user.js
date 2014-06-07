// ==UserScript==
// @name        Netflix Scroll Buster
// @namespace   micflan
// @description No more side scrolling nonsense.
// @include     *netflix.com*
// @version     1
// @grant       none
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.slider { height: auto !important; overflow: visible !important; } .slider .agMovieSetSlider { position: relative !important; width: auto !important; } .mrow .triangleBtns .sliderButton, .mrow .slider-button, .mrow:hover .triangleBtns .sliderButton, .mrow:hover .slider-button { display: none !important; }');