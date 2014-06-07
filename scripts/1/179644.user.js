// ==UserScript==
// @name          CSS: Estilo Facebook
// @namespace     MonstroChan.org
// @description    Cambiar la CSS mientras elegimos las mejores y luego se instalan en el chan... o cuando NK tenga tiempo ;____;
// @include        *monstrochan.org*
// ==/UserScript==




var cssUrl = "http://chandecarton.zz.mu/stuff/facedurr.css";

var head = document.getElementsByTagName("head")[0];

var link = document.createElement("link");

link.rel = "stylesheet";
link.type = "text/css";
link.href = cssUrl;

document.head.appendChild(link);