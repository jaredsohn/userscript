// ==UserScript==
// @name           mods.de LaTeX Black Font
// @namespace      http://userscripts.org/users/129044
// @include        *forum.mods.de*
// ==/UserScript==
var lateximg = document.getElementsByTagName("img");
for (var i = 0; i < lateximg.length; i++) if (lateximg[i].src.match("chart.apis.google.com/chart")) lateximg[i].src = lateximg[i].src.replace("chco=FFFFFF","chco=000000");