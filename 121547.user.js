// ==UserScript==
// @name blockHide.user.js
// @namespace blockHide
// @version 0.03
// @include *
// ==/UserScript==

function init() {
    document.getElementById("displaybox").style.display = 'none';
}
window.onload = init();  