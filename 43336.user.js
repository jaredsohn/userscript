//########################################################################
//   Ynet Talkback Remover  v0.47
//
// *** Technical details: ***
// See userscripts.org page for full description and Change Log.
//
// By: Lior Zur, 2009
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give proper credit. Thanks.
// Improvements & suggestions are welcome.
//
//########################################################################
// ==UserScript==
// @name           Ynet Talkback Remover
// @namespace      http://mywebsite.com/myscripts
// @description    Removes talkbacks from Ynet
// @include        http://*.ynet.co.il/*
// @include        http://ynet.co.il/*
// ==/UserScript==


// ==== Functions ====


function removeById (elementIds) {
   if (typeof elementIds == 'string') elementIds = [elementIds];
	var x, thisElement;
	for (x in elementIds) {
		if (elementIds[x] !== ""){
			thisElement = document.getElementById(elementIds[x]);
			if (thisElement) { thisElement.parentNode.removeChild(thisElement); }
		}
	}
}

removeById("stlkbctopheader");