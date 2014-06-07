// ==UserScript==
// @name           (R)Kaart
// @author   	   AF
// @version        1.1
// @include         http://*.tribalwars.nl/game.php?*
// ==/UserScript==

tr = document.getElementById('menu_row');
td = tr.children[2];
link = td.children[0].getAttribute('href');
menu2 = document.getElementById('menu_row2');
maptd = document.createElement('td');
maptd.className = 'firstcell box-item icon-box nowrap';
newLink = document.createElement('a');
newLink.href = link;
newSpan = document.createElement('span');
newSpan.className = 'icon header map';
maptext = document.createTextNode(' Kaart');
newLink.appendChild(newSpan);
newLink.appendChild(maptext);
maptd.appendChild(newLink);
menu2.insertBefore(maptd, menu2.firstChild);