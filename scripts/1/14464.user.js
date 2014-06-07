// ==UserScript==
// @name           Incoming Outgoing Flights BenGuryon Airport
// @namespace      israel gov
// @description    Display Incoming Outgoing Flights BenGuryon Airport
// @include        http://www.iaa.gov.il/*
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

addGlobalStyle('div#divDepData { height: 800pt ! important; }');
//