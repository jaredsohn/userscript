// ==UserScript==
// @name              Gmail ad remover
// @namespace         http://drikin.com/
// @description       Gmailの広告を消す
// @include           http://mail.google.com/*
// @include           https://mail.google.com/*
// ==/UserScript==

var css = document.createElement('style');
css.setAttribute("type", "text/css");

var c1 = ".oM {display:none !important;}";
var c2 = ".mv, .mB {display:none !important;}";

var n1 = document.createTextNode(c1);
var n2 = document.createTextNode(c2);

css.appendChild(n1);
css.appendChild(n2);

var h = document.getElementsByTagName('head')[0];
h.appendChild(css);
