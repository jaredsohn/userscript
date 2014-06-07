// ==UserScript==
// @name        remove-noscript
// @description remove all <noscript> tags in document
// @version     1.0
// @grant       none
// ==/UserScript==

var nscript = document.getElementsByTagName('noscript');
if (typeof nscript === 'string') {
    nscript = [
        nscript
    ];
}
for (var i = 0; nscript.length - 1; i++) {
    nscript[i].parentNode.removeChild(nscript[i]);
}




   