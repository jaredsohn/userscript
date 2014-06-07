// ==UserScript==
// @name           bahn.de - Nur Nahverkehr
// @namespace      http://www.bahn.de
// @description    Setzt Häkchen bei "Nur Nahverkehr"
// @include        http://www.bahn.de/p/view/index.shtml
// ==/UserScript==

var nahverkehr = document.getElementById("qf-nahverkehr");
nahverkehr.checked = "checked";


