// Author: Alexus http://vagcom.yorest.ru
// Name: AudiClub AdBlock
// Version: 2
// Date Updated: 2009.10.04
//
//
// ==UserScript==
// @name        AudiClub AdBlock
// @description Removes top ads from AudiClub forum pages.
// @include *audi-club.ru/forum/*
// ==/UserScript==


(function() {

	var adTop = document.getElementsByTagName('table');
	if (adTop[1]) {
		adTop[1].parentNode.removeChild(adTop[1]);
	}
	if (adTop[0]) {
		adTop[0].parentNode.removeChild(adTop[0]);
	}
})();