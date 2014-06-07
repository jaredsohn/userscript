//	Megaupload Slots Livres
//	Bulakaxa
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Megaupload slots ilimitadas
// @namespace http://www.ms.mff.cuni.cz/~hosel4am
// @description allows you to bypass megaupload slot limit without installing their toolbar
// @include *megaupload*
// ==/UserScript==

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

createCookie('megauploadtoolbar_visibility', 'yes', 7);
createCookie('megauploadtoolbar_id', '197A9F07D8724E438DEBE1C11EBBE405', 7);