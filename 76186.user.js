// 
// Hides extra text on Estiah pages
//
// ==UserScript==
// @name          Estiah - Hide extra text
// @description   Hides extra text on Estiah pages
// @include       http://www.estiah.com/dungeon/*
// add a "@" before "include" to hide the exchange rates on the market page
// include       http://www.estiah.com/market
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

//addGlobalStyle(".section_text { display: none ! important }");
addGlobalStyle(".paragraph_text { display: none ! important }"); // hide extra dungeon text
addGlobalStyle(".ratelist { display: none ! important }") ; // hide exchange rates