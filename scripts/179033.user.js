// ==UserScript==
// @name         Sectakraut
// @namespace     La hora de las peticiones...
// @description    Pone algo más o menos parecido al estilo Secta en KC, aunque no es del todo fiel...
// @include        *krautchan.net*
// ==/UserScript==




var cssUrl = "http://hurrr.netne.net/ZEKTA.css";

var head = document.getElementsByTagName("head")[0];

var link = document.createElement("link");

link.rel = "stylesheet";
link.type = "text/css";
link.href = cssUrl;

document.head.appendChild(link);