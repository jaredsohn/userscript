// ==UserScript==
// @name           PortraitZapper
// @namespace      kingdomofloathing.com/Drachefly
// @include        http://*.kingdomofloathing.com/charpane.php
// @include        file://*/charpane.php
// ==/UserScript==

row = document.getElementsByTagName('tr')[0];
row.deleteCell(0);