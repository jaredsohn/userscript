// ==UserScript==
// @name           TheWeatherNetwork.com simplify weather page
// @namespace      none
// @description    Removes some of the excess in the design of the weather page for a city.
// @include        http://www.theweathernetwork.com/weather/*
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

addGlobalStyle('#print_logo,#masthead_blue,#ugc,#ccb_container,#promowrap-vertical,#quickpoll,#bottomads,#yahoo_box,#workopolis{display:none;}');