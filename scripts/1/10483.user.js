// ==UserScript==
// @name           PI-Wikipedia-DblClick-remover
// @namespace      cigno5.5
// @description    Unable Punto Informatico Wikipedia Double Click articles features
// @include        http://punto-informatico.it/*
// ==/UserScript==

document.addEventListener('dblclick', function(event) {
    // event.target is the element that was clicked

    // do whatever you want here

    // if you want to prevent the default click action
    // (such as following a link), use these two commands:
    event.stopPropagation();
    event.preventDefault();
}, true);