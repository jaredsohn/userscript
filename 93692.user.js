// ==UserScript==
// @name           Flipkart Bar Remove
// @namespace      spo0nman
// @description    Orgasms for all 
// @include        http://*flipkart.*/*
// @include        https://*flipkart.*/*
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

addGlobalStyle(
	 '.fkart .fksk-submenu { background-image: none; }'+
        '.fksk-header-tabs-section { border-bottom:0px solid #F99C40;}');

