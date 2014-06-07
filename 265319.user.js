// ==UserScript==
// @name        InoReader - Log out button
// @description Adds an easily accessible log out button to InoReader. By TnS. Last update: 2014.03.16.
// @homepage    http://userscripts.org/scripts/show/265319
// @version     1.1
// @namespace   http://greasemonkey.mozdev.com
// @include     http://inoreader.com/*
// @include     https://inoreader.com/*
// @grant       none
// ==/UserScript==

function Main()
{
    var insertionPointElement = document.getElementById( "sb_menu_icon" );
	if ( !insertionPointElement )
		return;

	var signOutElement = document.createElement( "div" );
	signOutElement.setAttribute( "onclick", "document.location.href=\'?logout\'; return false;" );
	signOutElement.className = "inno_toolbar_button_wrapper";
	signOutElement.innerHTML = '<div class="inno_toolbar_button"><span class="inno_toolbar_button_caption">Sign out</span></div>';
	insertionPointElement.parentNode.insertBefore( signOutElement, insertionPointElement );
}

Main();