// ==UserScript==
// @name        Bonami prohlížeč
// @namespace   Bonami
// @description Umožňuje prohlížet bonami.cz bez registrace.
// @include     *.bonami.cz/*
// @grant       none
// @version     1.2
// ==/UserScript==

function addCss(cssString) { 
    var head = document.getElementsByTagName('head')[0];
    var newCss = document.createElement('style'); 
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss); 
    return head;
} 
addCss ( 
   .loginOverlay-container, .overlay, .loginOverlay-v2  { display: none ! important; }
    );