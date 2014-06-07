// ==UserScript==
// @name           7chan - Paging Alteration
// @namespace      tylerp
// @description   Paging Alteration
// @version        first
// @include         https://7chan.org/*
// ==/UserScript==

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

addGlobalStyle(' #paging a { background:none repeat scroll 0 0 activeborder ; border:2px outset gray ; color:black ; font- weight:bold ; padding:0 6px ; } '); addGlobalStyle(' #paging a:active { background:none repeat scroll 0 0 activeborder ; border:2px inset gray ; color:black ; font- weight:bold ; padding:0 6px ; } '); addGlobalStyle (' #paging li { font-weight: bold;} '); addGlobalStyle (' #paging input { font-weight: bold;} '); 