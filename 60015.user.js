// ==UserScript==
// @name           Pranger
// @description    Zeigt den Pranger an | Shows Pranger at Menu Table
// @version	   1.1
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


(function() {
var parent = document.getElementById('menuTable');
if (!parent) return;
var item = document.createElement('li');
item.className = 'menubutton_table';
item.innerHTML = '<a class="menubutton" href="pranger.php" target="_blank"><span class="textlabel">Pranger</span></a>';
parent.appendChild(item);
})()