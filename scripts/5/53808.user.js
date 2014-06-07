// ==UserScript==
// @name           rusro_forum
// @namespace      http://rusro.org
// @include        http://rusro.org/forum/*
// ==/UserScript==
var tds = document.getElementsByTagName("td");
for (var i=0; i<tds.length; i++) if (tds[i].className == "post1" || tds[i].className == "post2") tds[i].style.background = "none";
var ns = document.getElementById("navstrip").nextSibling;
while (ns != null) if (ns.className == "adver") { ns.parentNode.removeChild(ns); break; } else ns = ns.nextSibling;