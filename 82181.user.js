// ==UserScript==
// @name           Exile Coordonnees RC clickable
// @namespace      http://sheflaprod.free.fr
// @include        http://genesis.exile.fr/game/battle.asp*
// ==/UserScript==


var header = document.getElementById('battle').firstChild.firstChild.firstChild.firstChild,
	title = header.textContent.split(/\[|\]/),
	coord = title[1].split('.'),
	link = document.createElement('a');

link.textContent = title[1];
link.href = 'http://genesis.exile.fr/game/map.asp?g=' + coord[0] + '&s=' + coord[1] + '&p=' + coord[2];

header.textContent = '';
header.appendChild(document.createTextNode(title[0] + '['));
header.appendChild(link)
header.appendChild(document.createTextNode(']' + title[2]));