// ==UserScript==
// @name           Dampfer.NET | [News-Ticker] Made by =tObI=
// @namespace      Dampfer.NET
// @description    Ein News-Ticker erscheint.
// @include        http://*dampfer.net/*
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

addGlobalStyle(".bau_index_flash {width:750px !important; height:37px !important; visibility:hidden !important}");

document.getElementById("mainmenu_div").innerHTML = document.getElementById("mainmenu_div").innerHTML + "<iframe src='http://dampferstyling.ohost.de/scripts/news-ticker/news-ticker/news-ticker.html' style='width:750px; height:38px; border:0px'></iframe>";