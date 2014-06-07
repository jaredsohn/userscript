// ==UserScript==
// @name           FarmVille Hide Ghost Neighbors
// @namespace      http://userscripts.org/users/120159
// @description    Hides the ghost neighbors on the neighbor page until Zynga fixes this so they can be removed.
// @include        http://apps.facebook.com/onthefarm/*
// @copyright      Wayne Gibson
// @version        1.0
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var sGhostNeighbor = document.getElementsByClassName('neighborList');
	for ( var i = 0; i < sGhostNeighbor.length; i++) {
		var sGhostNeighborHTML = sGhostNeighbor[i].innerHTML;		
		var RegEx = sGhostNeighborHTML.match ("name=\"giftRecipient\" value=\"([0-9]*)\" " );
		if (!RegEx[1]) {
			sGhostNeighbor[i].parentNode.removeChild(sGhostNeighbor[i]);
		}
	}
