// ==UserScript==
// @name           Epaper-Kompas
// @namespace      gun_gun
// @description    Remove popup on Epaper Kompas
// @include        http://epaper.kompas.com/kompas/books/*
// @version	   0.1
// @grant  	   unsafeWindow
// ==/UserScript==

function removekompas() {

	var removeIDs = ['overl','multimediapp','imgbanner'];
	for (var i = 0; i < removeIDs.length; i++) {
		var gunDiv = document.getElementById(removeIDs[i]);
		if (gunDiv) {
			gunDiv.parentNode.removeChild(gunDiv);
                }
	}
}

if(unsafeWindow.top == unsafeWindow.self) {
	setTimeout(removekompas,250);
}