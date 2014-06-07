/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Multiply Show Unread Messages link
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Display Show Unread/All Messages link on Multiply Explore page
// @version	  0.1
// @include	  http://multiply.com/mail/*
// @exclude	  http://multiply.com/mail/message/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

unread_link = add_unread_link();

var unread_status = false;
var m;
if (m = document.location.search.match(/(\&?mail:unread=(on|1)?)/)) {
    GM_log(m.join("/"));
    GM_log('[0] ' + document.location.href);
    if (m[2] == 'on' || m[2] == '1') {
	unread_status = true;
    }
    unread_link.href = document.location.href.replace(/\&?mail:unread=(on|1)?/, '');
    unread_link.href = unread_link.href.replace(/\?$/, '');
}
GM_log('unread_status = ' + unread_status);
GM_log('[0] unread_link =' + unread_link.href);

// if (document.location.search.match(/mail:unread=(on|1)/)
if (unread_status) {
//     || document.getElementById('mail_label').textContent.match(/Unread/)) {
    unread_link.textContent = 'Show All';
} else {
    unread_link.textContent = 'Show Unread';
    unread_link.href = document.location.href.replace(/reset=1/, '');
    if (document.location.search) {
	unread_link.href = unread_link.href + (document.location.search.match(/^\?./) ? '&mail:unread=on' : '?mail:unread=on');
	GM_log('[3] ' + unread_link.href);
    } else {
// 	unread_link.href += '?mail:unread=on';
	unread_link.href = unread_link.href.replace(/\?$/, '') + '?mail:unread=on';
	GM_log('[4] ' + unread_link.href);
    }
}

/* set to reload periodically, but only for the Explore page */

if (window.location.href.match(/\/mail$|\/mail\/\d+/))
    window.setInterval(function() { window.location.reload() }, 10 * 60 * 1000 /* 10 minutes */ );


function add_unread_link()
{
    var mail_label = document.getElementById('mail_label');
    mail_label.rows[0].cells[0].style.whiteSpace = 'nowrap';
    mail_label.rows[0].cells[0].style.width = '10%';

    var filters = document.getElementById('advancedlinks');
    filters.style.width = 'auto';

    var unread = document.createElement('a');
    unread.id = 'unread_mail';

    filters.appendChild(unread);

    return unread;
}

