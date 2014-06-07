// ==UserScript==
// @name        Pikabu: Turn Keyboard Scroll Off
// @version     0.2
// @description Remove annoying onkeyup-handler that catches 'd' key presses.
// @include     http://pikabu.ru/*
// ==/UserScript==

document.body.onkeyup = function(event) {
    event.stopPropagation();
};
