// ==UserScript==
// @name        What.CD :: Open all unread forum threads
// @author      Z4ppy
// @namespace   Z4ppy.What.CD
// @description Opens all unread threads in a forum in new tabs
// @include     https://what.cd/forums.php?action=viewforum&*
// @include     https://what.cd/forums.php?*&action=viewforum&*
// @require     http://code.jquery.com/jquery-1.9.0.min.js
// @grant       GM_openInTab
// @version     1.0.3
// @date        2013-08-30
// ==/UserScript==

function Open(url) {
	// Shamelessly stolen from https://userscripts.org/scripts/show/116673 -- thanks, hateradio!
	try {
		f = GM_openInTab;
	} catch (e) {
		f = function (url) { window.open(url); window.focus(); };
	}
	f(url);
}

function OpenAllUnread() {
	//find all unread threads' <tr> tags
	var unread_trs = $('td.unread, td.unread_sticky, td.unread_locked, td.unread_locked_sticky').parent();
	
	//extract the thead links as well as the "Jump to last read" ones - we want to use the latter if it exists...
	var unread_threadlinks = unread_trs.find('strong > a');
	var unread_jumplinks = unread_trs.find('span.last_read > a');
	
	//go through the threadlinks, check if there's a "Jump to last read" for the current one, open the right one
	var i_jump = 0;
	var threadid_regex = /threadid=(\d+)(&|$)/;
	var t1, t2, a;
	for(var i = 0; i < unread_threadlinks.length; ++i) {
		t1 = threadid_regex.exec(unread_threadlinks[i]);
		t2 = threadid_regex.exec(unread_jumplinks[i_jump]);
		if(t2 == null || t2[1] != t1[1]) {
			//didn't read this thread before. use thread link (first page)
			a = unread_threadlinks[i];
		} else {
			//read something in this thread before. use "Jump to last read"
			a = unread_jumplinks[i_jump];
			++i_jump;
		}
		
		//open a in new tab
		Open(a.href);
	}
}

$('.linkbox').first().prepend($('<a>',{
    text: 'Open all unread threads',
    href: '#',
    click: function(){ OpenAllUnread(); return false; },
    class: 'brackets'
}));