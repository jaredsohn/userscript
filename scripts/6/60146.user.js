// ==UserScript==
// @name           vBulletin easy Mark Read
// @namespace      http://armeagle.nl
// @description    Move the "Mark This Forum Read" button from the Forum Tools dropdown to the forum bar (left of said dropdown).
// @include        *forumdisplay.php?f=*
// @include        http://forums.electronicarts.co.uk/*
// Add whatever site you need it yourself.
// ==/UserScript==

var td_forumtools = document.querySelector('#forumtools');
if ( td_forumtools != null ) {
	// the dropdown menu isn't always the same, for example if you're not allowed to create a new thread.
	var td_options = document.querySelectorAll('#forumtools_menu > form > table > tbody > tr > td');
	var td_markread = null;
	for ( key in td_options ) {
		var a = td_options[key].querySelector('a');
		
		if ( a.textContent.toLowerCase().indexOf('mark this forum read') >= 0 ) {
			td_markread = td_options[key];
			break;
		}
	}
	if ( td_markread != null ) {
		td_markread.setAttribute('class', td_forumtools.getAttribute('class'));
		td_markread.setAttribute('nowrap', 'nowrap');
		td_forumtools.parentNode.insertBefore(td_markread, td_forumtools);
	}
}