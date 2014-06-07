// ==UserScript==
// @name         Kibbles
// @version      1.0
// @description  Replaces all instances of 'KibbieTheGreat' and 'Kibbie' with 'Kibbles'.
// @downloadURL  https://userscripts.org/scripts/source/171961.user.js
// @include      *
// ==/UserScript==

// Adapted from http://stackoverflow.com/questions/1175775/
 
function htmlreplace(a, b, element) {    
    if (!element) element = document.body;    
    var nodes = element.childNodes;
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            var r = new RegExp(a, 'gi');
            nodes[n].textContent = nodes[n].textContent.replace(r, b);
        } else {
            htmlreplace(a, b, nodes[n]);
        }
    }
}

htmlreplace('KibbieTheGreat', 'Kibbles');
htmlreplace('Kibbie', 'Kibbles');