// ==UserScript==
// @name         CompatMode
// @namespace    http://www.heiselman.com/
// @description  Inserts text that shows rendering mode on any page
// @include      *
// ==/UserScript==

(function() {
if (document.compatMode) {
    var mydiv = document.createElement('div');
    mydiv.appendChild(document.createTextNode("Render Mode: " + document.compatMode));
    document.body.appendChild(mydiv);
}
})()