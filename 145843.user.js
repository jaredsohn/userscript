// ==UserScript==
// @name        altdevblogaday body display block
// @namespace   D:\AltDev_fix.txt
// @description shows page on FF, while bug is on
// @include     http://www.altdevblogaday.com/*
// @version     1
// ==/UserScript==

function addCss(cssString) { 
    var head = document. 
    getElementsByTagName('head')[0]; 
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
} 

// fix
addCss ( 
    'body { display: block;}'
);
