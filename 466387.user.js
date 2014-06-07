// ==UserScript==
// @name        P10CodeWindow
// @namespace   http://polopoly10.archant.co.uk/polopoly/*
// @description Resize Code Window
// @include     http://polopoly10.archant.co.uk/polopoly/CM
// @version     v1.0
// @grant       P10_CodeWindow
// ==/UserScript==

P10_CodeWindow("div.CodeMirror, div#CodeMirror{min-width:100% !important;}");
P10_CodeWindow(".CodeMirror-scroll{font-size:120% !important;line-height:125% !important;height:100% !important;}");
function P10_CodeWindow(newCSS){
    head = document.getElementsByTagName("head")[0];
    style = document.createElement("style");
    style.setAttribute("type", 'text/css');
    style.innerHTML = newCSS;
    head.appendChild(style);
}