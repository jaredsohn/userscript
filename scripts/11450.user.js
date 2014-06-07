// Hitman List Cleaner
// version 0.1
// 2007.07.28
// Copyright (c) 2007, Stinky Pete
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Hitman List Cleaner
// @namespace      http://www.deadawaken.com
// @description    This script cycles through the list _existing_ hitmen and removes them from the drop-down box.
// @include        http://www.deadawaken.com/game.php?sec=ho&scr=hofighters*
// @exclude        http://www.deadawaken.com/game.php?sec=ho&scr=hofighters&cmd=addfighter*
// ==/UserScript==

var hitmanLinks, hitmanSelect, selectChildren, empty, option, text;

hitmanLinks = document.evaluate( "//a[contains(@href, 'hocharinfo')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
hitmanSelect = document.getElementsByTagName( 'select' )[0];

// Cycle through every current hitman, remove them from the <select>.
for( var i = 0; i < hitmanLinks.snapshotLength; i++ )
{
	var url = hitmanLinks.snapshotItem(i).href;
	var end = url.substring( url.indexOf( 'listId=' ) + 7 );
	var key = end.substring( 0, end.indexOf( '&r=' ) );
	option = document.evaluate( "option[@value='" + key + "']", hitmanSelect, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	option.parentNode.removeChild( option );
}

// Check to see if the <select> is empty.  Sadly, it usually contains an irrelevant Text node.
selectChildren = hitmanSelect.childNodes;
empty = true;
for( var i = 0; i < selectChildren.length; i++ )
{
	if( selectChildren[i] instanceof Element )
	{
		empty = false;
	}
}

// Don't leave an empty <select>.  It's ugly
if( empty )
{
	optionNode = document.createElement( 'option' );
	optionNode.appendChild( document.createTextNode( 'THERE IS NO DATA. THERE IS ONLY XUL.' ) );
	hitmanSelect.appendChild( optionNode );
}