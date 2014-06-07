// ==UserScript==
// @name        Comic Sans dag
// @namespace   -
// @description Alles in Comic Sans!
// @include     htt*://*
// @version     1
// ==/UserScript==

var css = document.createElement('style');
css.type = "text/css";
css.innerHTML = "* {font-family: Comic Sans MS !important;}";
document.head.appendChild(css);