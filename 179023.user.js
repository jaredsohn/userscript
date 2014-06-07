// ==UserScript==
// @name          CSS: Burichan (el original de Yotsuba B)
// @namespace     MonstroChan.org
// @description   Cambia la CSS mientras elegimos las mejores y luego se instalan en el chan... o cuando NK tenga tiempo ;____;
// @include        *monstrochan.org*
// ==/UserScript==


var cssUrl = "http://monstrochan.org/l/css/burichan.css";

var head = document.getElementsByTagName("head")[0];

var link = document.createElement("link");

link.rel = "stylesheet";
link.type = "text/css";
link.href = cssUrl;

document.head.appendChild(link);