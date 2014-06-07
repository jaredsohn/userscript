// ==UserScript==
// @name		UserScript.org Profile Link In Menu
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-09-06
// @lastupdated	2009-09-06
// @namespace	userscriptsOrgAddProfileLink
// @include		http*://*userscripts.org/*
// @version		0.1
// @description	Add a profile link to the site wide menu available to logged in users.
// ==/UserScript==

userscriptsOrgAddProfileLink = function() {
	var menu = document.getElementById('homeMenu');
	if(!menu) return false;
	var pubProLink=document.evaluate("./li/a[contains(text(),'public profile')]",menu,null,9,null).singleNodeValue;
	if(!pubProLink) return;
	var newListItem = document.createElement( 'li' );
	newListItem.innerHTML = "<a title=\"Edit your profile information\" href=\"/home/settings/profile\">profile</a>";
	menu.insertBefore(newListItem,pubProLink.parentNode);

	return true;
}

userscriptsOrgAddProfileLink();