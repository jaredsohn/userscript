// ==UserScript==
// @name        Remove TotalFPL Stripes
// @namespace   http://userscripts.org
// @include     *
// @version     1
// ==/UserScript==
var anims = documents.getElementsByClassName("stripes");
anims.className = "";