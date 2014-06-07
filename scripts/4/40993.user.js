// ==UserScript==
// @name          Add My Groups Link
// @description   Adds a My Groups link to Google Help Forums
// @include       http://*.google.com/support/forum/p/*
// ==/UserScript==

var main, newElement
main = document.getElementById('whacfl')
if(main) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<div align="right"><strong><a href="http://groups.google.com/?hl=en" target="_blank">Groups</a>&nbsp;&nbsp;&nbsp;</strong></div>';
    main.parentNode.insertBefore(newElement, main);
}

