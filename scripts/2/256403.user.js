// ==UserScript==
// @name       Hide Pistonheads Adverts
// @version    0.1.1
// @description  Hides adverts on Pistonheads
// @match      *://*.pistonheads.com/*
// @copyright  2013
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

addGlobalStyle('#taboola-bottom-main-column, #taboola-below-main-column-mix, #taboola-below-main-column, #taboola-right-rail-mix, div.google, #banner, #skyscraper, div.squareAd, td.mpu, #leaderBoard { display: none !important; } .home-search-console { min-height: 0 !important; }');