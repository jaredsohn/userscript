// ==UserScript==
// @name       Large Gmail Input
// @namespace  http://lewisoaten.com/greasemonkey
// @description  Makes the Input text boxes larger when composingnew messages
// @match      https://mail.google.com/mail/*
// @copyright  2012+, Lewis Oaten
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".aoT { font-size: small !important; }";
css.innerHTML += ".oL.aDm { font-size: small !important; }";
css.innerHTML += ".xi, .vO, .vO:focus { font-size: small !important; }";
document.body.appendChild(css);