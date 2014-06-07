// ==UserScript==
// @name          First script / remove facebook header
// ==/UserScript==

var header = document.getElementById('logo');
if (header) {
    header.parentNode.removeChild(header);
}
