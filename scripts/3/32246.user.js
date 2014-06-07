// ==UserScript==
// @name           Syrnia - No Mr. Addy
// @namespace      http://userscripts.org/users/63546
// @description    Get's rid of Mr. Addy posts and the google search on Syrnia.
// @include        http://www.syrnia.com/theGame/mainincludes/forum.php?pop=yes&action=viewtopic*
// @include        http://www.syrnia.com/game.php*
// ==/UserScript==

//Remove Mr. Addy posts on forum topics
if (location.href.search(/forum.php/) != -1) {
	var addyRow=document.getElementsByTagName('table')[0].firstChild.childNodes[1];
	addyRow.parentNode.removeChild(addyRow);
}

//Remove google search on main page
if (location.href.search(/game.php/) != -1) {
	document.getElementById('googleSearchContainer').style.display='none';
}
