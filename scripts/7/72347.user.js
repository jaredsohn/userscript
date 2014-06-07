// ==UserScript==
// @name           FastNPC Travians
// @namespace      travians
// @include        http://travians.com/game.php*
// @include        http://travianer.de/game.php*
// ==/UserScript==

var fastNPC = document.createElement('div');
fastNPC.innerHTML = '<a style="color: #FFFFFF" onclick="xajax_click(7606, 5332, 7610, 5334, \'fight<go<-39#-39#-39#-39\', 0, 0, 0, 0, -1, 0, 0); return false;">Fight NPC</a>';
fastNPC.style.display = 'block';
fastNPC.style.position = 'absolute';
fastNPC.style.top = 0;
fastNPC.style.left = 0;
document.body.appendChild(fastNPC);
