// ==UserScript==
// @name          TNet Custom CSS
// @include       http://tweakers.net
// @include       http://tweakers.net/*
// ==/UserScript==

function addStyle(style) {
var head = document.getElementsByTagName("HEA­D")[0];
var ele = head.appendChild(window.document.c­reateElement( 'style' ));
ele.innerHTML = style;
return ele;
}

addStyle('@import url('http://files.jamiemarciano.me/tweakers/custom.css');');­