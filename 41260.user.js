// ==UserScript==
 // @name           ClearGoogle
 // @namespace      
 // @description    Clears iGoogle page 
 // @include        http*://www.google.com/*
 // @version        0.9b
// ==/UserScript==

var bar = document.getElementById("nhdrwrapsizer");
bar.style.display = 'none';
bar.nextSibling.nextSibling.style.display = 'none';

// Hide the footer
document.getElementById("footerwrap").style.display = 'none';
