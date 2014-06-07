// ==UserScript==
// @name           RC UN Highlighter.
// @namespace      http://dev.josh-m.com/
// @description    Highlights things that are the same as the contents of (#navbar-login strong).
// @include http://*.facepunch.com/forums/62*
// ==/UserScript==

var el = document.getElementsByTagName("body")[0];
var el2 = document.getElementById("navbar-login").getElementsByTagName("strong")[0];
var st = el2.innerHTML;

rst = (st+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
el.innerHTML = el.innerHTML.replace(new RegExp(rst, 'ig'), "<font style='background-color: #F00;'>" + st + "</font>");
el2.innerHTML = st;