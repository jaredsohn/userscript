// ==UserScript==
// @name           REDESIGN: Schandpaal (Pranger)
// @description    Laat de schandpaal zien in het menu
// @version	   1.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


(function() {
var parent = document.getElementById('menuTable');
if (!parent) return;
var item = document.createElement('li');
item.className = 'menubutton_table';
item.innerHTML = '<a class="menubutton" href="pranger.php" target="_blank"><span class="textlabel">Schandpaal</span></a>';
parent.appendChild(item);
})()