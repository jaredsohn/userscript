/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// Multiply - Notify new replies in threaded view
// version 0.6
// 2008-05-15
// Copyright (c) 2008, Prakash Kailasa <pk-moz at kailasa dot net>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Click on the Install button on top right corner of the page.
// Accept the default configuration and install.
//
// To uninstall, right-click on the monkey icon in the status bar,
// and select 'Manage User Scripts' (Or, go to Tools -> Manage User Scripts),
// select "Multiply Show Unread Messages link", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	  Multiply - Notify new replies in threaded view
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Notify new replies in threaded mode
// @version	  0.6
// @include	  http://*.multiply.com/*
// @include	  http://multiply.com/mail/message/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

const DEBUG = true;
var debug = DEBUG ? function(s) {GM_log('[' + new Date() + ']' + s);} : function(s) {};
var error = function(s) {GM_log('[' + new Date() + ']' + s);};

function include_script(src) {
    var scr = document.createElement('script');
    scr.src = src;
    src.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(scr);
    debug('include_script: ' + src + ' -- done.');
}

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; mark_recent_replies(); check_new_replies(); }
}

// are we in threaded mode?
var live_replies = unsafeWindow.live_replies;
if (typeof live_replies == "undefined" || live_replies == 1) {
    return;
}
else {
    // Integrate jQuery first
    include_script('http://jquery.com/src/jquery-latest.js');
    GM_wait();
}

var anchors = new Array();
var new_reply_anchor_index = -1;

function scroll_to_next_reply() {
    if (anchors.length > 0) {
	new_reply_anchor_index++;
	if (new_reply_anchor_index > anchors.length)
	    new_reply_anchor_index = 0;
	if (new_reply_anchor_index >= 0 && new_reply_anchor_index < anchors.length)
	    anchors[new_reply_anchor_index].scrollIntoView();
    }
}

function scroll_to_prev_reply() {
    if (anchors.length > 0) {
	new_reply_anchor_index--;
	if (new_reply_anchor_index < 0)
	    new_reply_anchor_index = anchors.length - 1;
	anchors[new_reply_anchor_index].scrollIntoView();
    }
}

function mark_recent_replies() {
    var m = window.location.search && window.location.search.match(/replies_read=(\d+)/);
    if (m && m[1].length > 0) {
	debug('replies_read=|' + m[1] + '|');
	var replies_read = parseInt(m[1]);
	debug('replies_read=|' + replies_read + '|');
	var new_marker = '<span class="new-reply-marker">new</span>';
	GM_addStyle('.new-reply-marker { color: red; border: 1px solid #88f; font: italic small-caps 11px sans-serif; margin-left: 5px; padding: 0 2px; }');

	$("#replies .reply").each(function() {
				      var mm = this.id.match(/\+(\d+)$/);
				      var reply_id = mm && mm[1] ? parseInt(mm[1]) : null;
				      if (reply_id && reply_id >= replies_read) {
					  $(this).find(".replyboxstamp").append(new_marker);
					  anchors.push($(this).prev().get(0));
				      }
				      else {
					  $(this).addClass("replyboxread");
				      }
				  });

	if (anchors.length > 0) {
	    scroll_to_next_reply();
	    // bind 'N' and 'P' to next/prev new reply
	    $(document).keypress(function(e) {
				     if (e.target.tagName == 'TEXTAREA' || e.target.tagName == 'INPUT') return;
				     switch (e.which) {
				     case 78:
					 scroll_to_next_reply();
					 break;
				     case 80:
					 scroll_to_prev_reply();
					 break;
				     }
				 } );
	}
    }
}

function check_new_replies() {
    var item_key = unsafeWindow.item_key;
    if (typeof item_key == "undefined") {
	debug("item_key is not defined. nothing to do");
	return;
    }
    var replies_count = get_replies_count();
    debug('item_key |' + item_key + '|, replies_count |' + replies_count + '|');

    var new_replies_url = ['/item/new-replies', item_key, replies_count, Math.round(100000 * Math.random()), 'newreplies'].join('/');
    debug('new_replies_url |' + new_replies_url + '|');

    $.get(new_replies_url, null, notify_new_replies);
}

function get_replies_count() {
    if (typeof unsafeWindow.replies_count != "undefined")
	return unsafeWindow.replies_count;

    var num_comments = parseInt($('#numcommentslabel').text());
    return isNaN(num_comments) ? 0 : num_comments;
}

var check_replies_delay = 4000;

function notify_new_replies(data) {
    var new_replies_count = parseInt(data.split('|')[0]);
    if (!isNaN(new_replies_count)) {
	var replies_count = get_replies_count();
	if (new_replies_count > replies_count) {
	    show_new_replies(new_replies_count, replies_count);
	    check_replies_delay = 1000;
	}
	else {
	    check_replies_delay *= 1.2;
	}
    }

    if ($('#viewing_history_holder').length > 0) {
	var view_count = parseInt(data.split('|')[1]);
	refresh_viewing_history(view_count);
    }

    // set up next check
    window.setTimeout(check_new_replies, check_replies_delay);
}

function show_new_replies(new_replies_count, replies_count) {
    var count = new_replies_count - replies_count;
    if ($('#new_replies_notice').length == 0) {
	var notify_css = {
	    padding : '5px 10px',
	    'background-color' : '#d4d7e1',
	    color: '#545454',
	    border: '1px dotted #ababab',
	    'font-weight': 'bold',
	    'z-index': '10001',
	    position: 'fixed',
	    bottom: '0px',
	    left: '0px',
	    cursor: 'pointer'
	};

	var refresh_page = function() {
	    var search = window.location.search;
	    if (search && search.length > 0) {
		search = search.replace(/replies_read=\d+/, '')
		    .replace(/^\?\&/, '?')
		    .replace(/\&$/, '');
		search += (search.length > 1 ? '&' : '') + 'replies_read=' + replies_count;
	    }
	    else {
		search = '?replies_read=' + replies_count;
	    }
	    debug('search = |' + search + '|');
	    window.location.search = search;
	};

	$('<div id="new_replies_notice">This post has <span id="new_replies_message"></span>. <a onclick="window.location.reload()" style="cursor: pointer">Refresh</a></div>')
	    .appendTo('body')
	    .hide()
	    .css(notify_css)
	    .click(refresh_page);

	// bind 'r' and 'R' to refresh page
	$(document).keypress(function(e) {
				 if (e.target.tagName == 'TEXTAREA' || e.target.tagName == 'INPUT') return;
				 switch (e.which) {
				 case 114:
				 case 82:
				     refresh_page();
				     break;
				 }
			     } );
    }

    var msg = count == 1 ? 'a new reply' : (count + ' new replies');
    var old_msg = $('#new_replies_message').text();
    if (old_msg != msg) {
	$('#new_replies_notice').hide();
	$('#new_replies_message').text(msg);
	$('#new_replies_notice').fadeIn("slow");
    }
}

function refresh_viewing_history(view_count) {
    if (isNaN(view_count) || view_count <= unsafeWindow.global_page_views) {
	return;
    }

    var key = unsafeWindow.global_page_key;
    var desc = unsafeWindow.global_page_desc;

    var history_url = '/show-viewing-history/' + key + '?item_desc=' + escape(desc);
    $('#viewing_history_holder').load(history_url);

    unsafeWindow.global_page_views = view_count;
}
