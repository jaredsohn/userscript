// ==UserScript==
// @name           Kings Age - Cacher les niveaux des bÃ¢timents
// @namespace       
// @include        http://s5.kingsage.fr/game.php
// @include        http://s5.kingsage.fr/game.php?village=32054&s=overview
// ==/UserScript==

field = document.getElementsByTagName("label");
for(i = 0; i < field.length; i++) {
	(field[i].style.display == 'none') ? field[i].style.display = '' : field[i].style.display = 'none';
}
(document.getElementById('show_level').innerHTML == 'Masquer le niveau des bâtiments') ? document.getElementById('show_level').innerHTML = 'Afficher le niveau de bâtiments' : document.getElementById('show_level').innerHTML = 'Masquer le niveau des bâtiments';