// ==UserScript==
// @name        BTN :: Open all unread forum threads
// @author      Z4ppy
// @namespace   Z4ppy.BTN
// @description Opens all unread threads in a forum in new tabs
// @include     https://BTN/forums.php?action=viewforum&*
// @require     http://code.jquery.com/jquery-1.9.0.min.js
// @grant       none
// @version     1.0
// @date        2013-04-29
// ==/UserScript==

function OpenAllUnread() {
	//find all unread threads' <tr> tags
	var unread_trs = $('img[src$="unread.png"]').parent().parent();
	
	//extract the thead links as well as the "Jump to last read" ones - we want to use the latter if it exists...
	var unread_threadlinks = unread_trs.find('strong > a');
	var unread_jumplinks = unread_trs.find('img[title="Go to last read post"]').parent();
	
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
		a.target = '_blank';
		a.click();
		a.target = '';
	}
}

$('.linkbox').first().prepend($('<a>',{
    text: 'Open all unread threads',
    href: '#',
    click: function(){ OpenAllUnread(); return false; },
    class: 'brackets'
}));