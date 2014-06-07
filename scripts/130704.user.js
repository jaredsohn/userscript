// ==UserScript==
// @name           G+ Readability
// @namespace      who.is.matt.burns
// @description    Changes the text color for comments on G+ from gray to black
// @include        https://plus.google.*
// ==/UserScript==

function noMoreGrayComments() {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ".kH { color: black !important; } .xs { color: blue !important; } .is { color: blue !important; }";
    head.appendChild(style);
}

noMoreGrayComments();

