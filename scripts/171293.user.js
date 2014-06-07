// ==UserScript==
// @name        Hide Wall On Facebook
// @namespace   tracz.me/fm
// @include     *facebook.com*
// @version     1
// ==/UserScript==



var div = document.getElementById("contentArea");
if (div) {
    div.style.display = "none"; // Hides it
    // Or
    // div.parentNode.removeChild(div); // Removes it entirely
}