// ==UserScript==
// @name		UserScripts.org 'Jetpack Management' Link in the User Menu
// @author		Erik Vold
// @datecreated	2010-01-02
// @lastupdated	2010-01-02
// @namespace	usoJetpackManagement
// @include		http*://*userscripts.org/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will add a &quot;Jetpack Management&quot; link in the user menu of userscripts.org
// ==/UserScript==

(function() {
	var menu = document.getElementById( 'homeMenu' );
	if(!menu) return;

	var newListItem = document.createElement( 'li' ),
		sctMg = document.evaluate(".//li/a[contains(text(),'script management')]",menu,null,9,null).singleNodeValue,
		userID = document.evaluate(".//li/a[@user_id]",menu,null,9,null).singleNodeValue.getAttribute("user_id");
	newListItem.innerHTML = "<a title=\"Jetpack Management\" href=\"/users/"+userID+"/jetpacks\">jetpack managment</a>";
	(!sctMg) ? menu.appendChild( newListItem ) : menu.insertBefore(newListItem,sctMg.parentNode.nextSibling);
})();