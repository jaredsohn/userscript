// ==UserScript==
// @name Boards.ie Mark Forums Read script
// @namespace http://cgarvey.ie/
// @version 1.3
// @description Add a Mark All Read link to the new (2012) Boards.ie control panel, in the My Forums header. v1.2 fixes bug that stopped script working in Firefox.
// @include http*://boards.ie/*/usercp.php*
// @include http*://www.boards.ie/*/usercp.php*
// @copyright 2012-2013, Cathal Garvey
// @grand none
// ==/UserScript==


// Get the existing (currently hidden) Mark All Forums Read link
var elExistingMarkReadLink = null;
var aMarkReadLinks= document.evaluate('//a[contains(@href, "forumdisplay.php?do=markread")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for( var i = 0; i < aMarkReadLinks.snapshotLength; i++ ) {
	elExistingMarkReadLink = aMarkReadLinks.snapshotItem(i);
	break;
}

if( elExistingMarkReadLink ) {
	// Get the "My Forums" text, so we can inject our new link
	var dvMyForums = document.getElementById( "collapseimg_usercp_forums" );
	if( dvMyForums ) {
		// Create our new link (just copying the href of the existing hidden link, complete with random hash)
		var elA = document.createElement('a');
		elA.href = elExistingMarkReadLink.href;
		elA.setAttribute( "style", "margin-left: 15px; font-size: 0.9em;" );
		elA.setAttribute( "title", "Mark all forums read" );
		elA.appendChild( document.createTextNode( "[Mark All Read]" ) );

		// Append our link to afer the "My Forums text"
		dvMyForums.parentElement.parentElement.insertBefore( elA, null );
	}
}

