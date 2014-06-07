// ==UserScript==
// @name		Skip Steam Store Age Check
// @namespace	http://userscripts.org/users/wxMichael
// @description	This will automatically fill in and submit the age check form in the Steam Store.
// @include		http://store.steampowered.com/agecheck/*
// ==/UserScript==

var tags = document.getElementsByTagName('select');
for(var i = 0; i < tags.length; i++) {
	if (tags[i].name == 'ageYear') {
		tags[i].selectedIndex = 0;
		break;
	}
}
document.forms[1].submit();