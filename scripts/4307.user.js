// ==UserScript==
// @name           kill the slash
// @namespace      net.siebenzehn
// @description    disables hotkeys /'- for the search bar
// @include        *
// ==/UserScript==

   document.addEventListener('keypress', function(e) {
    if((e.charCode==39||e.charCode==45||e.charCode==47)&&e.target.nodeName=="HTML")
     e.preventDefault();
   },false);
