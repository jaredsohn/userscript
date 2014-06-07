// ==UserScript==
// @name           KoL Turns Played
// @namespace      http://userscripts.org/users/75549
// @include        http://127.0.0.1*charpane.php
// @include        *localhost*charpane.php
// @include        *kingdomofloathing.com*charpane.php
// ==/UserScript==

turns = unsafeWindow.turnsthisrun;
turns = String(turns);
if(turns.length > 3) {
	turns = turns.substring(0, turns.length - 3) + "," + turns.substring(turns.length - 3, turns.length);
}


elem = document.getElementsByTagName('table');
for(i=0;i < elem.length;i++) {
	if (elem[i].innerHTML.indexOf("hourglass.gif") != -1) {
		compactMode = false;
		h = i;
		break;
	}
	if (elem[i].innerHTML.indexOf(">Adv<") != -1) {
		compactMode = true;
		h = i;
		break;
	}
}

if(compactMode) {
	elem[h].innerHTML += "<tr><td align='right'>TP:</td><td align='left'><b>" + turns + "</b></td></tr>";
}
else {
	elem[h].innerHTML += "<tr><td colspan='2'><span class='black'>Turns Played: " + turns + "</span></td></tr>";
}