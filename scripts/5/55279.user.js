// ==UserScript==
// @name		UserScript.org 'Add New Script' Link In Menu
// @author		Erik Vold
// @datecreated	2009-08-05
// @lastupdated	2009-08-05
// @namespace	userscriptsOrgAddNewScriptInMenu
// @include		http*://*userscripts.org/*
// @version		0.1
// @description	This is a simple userscript for frequent userscript authors which adds a 'Add New Script' link to the site wide menu for logged in users.
// ==/UserScript==

userscriptsOrgAddNewScriptInMenu = function() {
	var menu = document.getElementById( 'homeMenu' );

	if( !menu ){
		return false;
	}

	var newListItem = document.createElement( 'li' );
	newListItem.innerHTML = "<a title=\"Upload a new userscript\" href=\"/scripts/new\">Upload new script</a>";
	menu.appendChild( newListItem );

	var newListItem = document.createElement( 'li' );
	newListItem.innerHTML = "<a title=\"Upload a new jetpack\" href=\"/jetpacks/new\">Upload new jetpack</a>";
	menu.appendChild( newListItem );

	return true;
}

userscriptsOrgAddNewScriptInMenu();