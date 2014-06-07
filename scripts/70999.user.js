// ==UserScript==
// @name          Simple Garzanti Linguistica
// @description   Simplifies garzantilinguistica.it for quick and easy use
// @include       http://www.garzantilinguistica.it/*
// ==/UserScript==

var head = document.getElementById(‘head’);
if (head) {
    adSidebar.parentNode.removeChild(head);
}