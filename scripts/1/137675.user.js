// ==UserScript==
// @name           Android - Printing layout improvement
// @namespace      http://userscripts.org/user/code.ape
// @description    Android API guides' Content/layout improvement for printable version: No sidebar.
// @include        http://developer.android.com/guide/*
// @copyright      code.ape
// @version        0.92
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var elemStyle = document.createElement("style");
elemStyle.setAttribute("type", "text/css");
elemStyle.innerHTML = "@media print { #side-nav { visibility: hidden; width: 0px; } #doc-col { width: 880px; } }";
document.getElementsByTagName("head")[0].appendChild(elemStyle);
