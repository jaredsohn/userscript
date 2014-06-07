// ==UserScript==
// @name           UpsideDown
// @namespace      forcetree
// @include        http://board.ogame.de/index.php?page=Index*
// ==/UserScript==

m = document.getElementById("category205");
muelle = m.getElementsByTagName("li")[3];
document.getElementById("category27").insertBefore(muelle, document.getElementById("category27").firstChild);