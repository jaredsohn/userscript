// ==UserScript==
// @name Z8Games Forum Fix
// @namespace http://liquiron.com
// @description  Colour tag misuse and enable fluid width
// @include http://forum.z8games.com/showthread.php*
// @include http://forum.z8games.com/showpost.php*
// @exclude 
// ==/UserScript==

function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style;
return ele;
}
addStyle('@import "http://liquiron.com/misc/z8/z8.css";');