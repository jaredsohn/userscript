// ==UserScript==
// @name       UseTogether Feedback filter indent
// @namespace  http://kerek.es/
// @version    0.1
// @description  enter something useful
// @match      http://*.usetogether.ro/feedback/*
// @copyright  2012+, You
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function addCss(cssString) { 
    var head = document. 
    getElementsByTagName('head')[0]; 
    return unless head; var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
} 

addCss ( 
    'ul { margin: 0 0 9px 0px; ! important }' 
);
