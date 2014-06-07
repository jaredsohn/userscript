// ==UserScript==
// @name        Google linkkien korjaaja 2
// @namespace   http://userscripts.org/users/515330
// @include     https://www.google.com/*
// @include     *://*.google.*/*
// @version     1
// ==/UserScript==

var ires = document.getElementById("ires");
var myList = ires.getElementsByTagName("a");

for (var i = 0; i < myList.length; i++) {
    myList[i].removeAttribute("onmousedown");
}
