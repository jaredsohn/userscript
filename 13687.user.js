/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Multiply - Keyboard navigation
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Navigate Inbox messages and photo albums using keyboard shortcuts
// @version	  0.13
// @include	  http://multiply.com/
// @include	  http://multiply.com/mail
// @include	  http://multiply.com/mail/*
// @include	  http://multiply.com/mail?*
// @exclude	  http://multiply.com/mail/message/*
// @include       http://*.multiply.com/photos/photo/*
// @include       http://*.multiply.com/photos/album/*
// @include       http://*.multiply.com/photos/hi-res/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

/*
 * j -> Next message
 * k -> Previous message
 * J -> Next unread message
 * K -> Previous unread message
 * r -> read message
 * R -> read message in new tab
 * s -> focus on the first link in Message Summary
 * > -> Next page
 * < -> previous page
 *
 * Added in version 0.2:
 *
 * g -> toggle groups
 * u -> toggle unread
 * 0 -> Mine
 * 1 -> My Contacts
 * 2 -> Close Network
 * 3 -> Medium Network
 * 4 -> Distant Network
 *
 * Added in version 0.3:
 *
 * c -> toggle custom filter menu
 *
 * Added in version 0.7:
 *
 * on photo pages: n -> next photo, p -> previous photo
 *
 * Added in version 0.8:
 *
 * on photo pages: a -> album page
 *
 * Added in version 0.12:
 *
 * on photo pages: 1, 2, 3, 4 -> go to the numbered photo
 *
 * Added in version 0.13:
 *
 * on photo pages: z -> zoom in photo, b -> go back to photo from hi-res page
 *
 */

/*
 * TODO:
 * Shift + Home -> First message
 * Shift + End  -> Last Message
 * PageUp -> Go back N messages
 * PageDown -> Go forward N messages
 *
 * keys for Pin, Subscribe, Delete, Mark as Read functions?
 */

const DEBUG = false;
var debug = DEBUG ? function(s) {GM_log(s);} : function(s) {};

/*
 * Integrate jQuery first
 * (snippet from http://joanpiedra.com/jquery/greasemonkey/)
 */

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    if ($('.splashwrapper').length > 0) {
	debug('on login page.');
	return;
    }

    if ($('#item_table .mrow, #item_table .tablediv1').length < 1) {
	debug('no messages found.');
// 	return;
    }

    setup_keyboard_shortcuts();
}

var current = null;
var on_inbox_page = document.location.host == 'multiply.com';
var on_album_page = document.location.pathname.match(/^\/photos\/album/);
var on_hires_page = document.location.pathname.match(/^\/photos\/hi-res/);

function setup_keyboard_shortcuts() {
    GM_addStyle('#item_table .msg_current { background-color: #ffe; color: #444; border: 1px solid #8b8; -moz-border-radius: 8px; padding: 3px; }');
    GM_addStyle('#item_table .msg_current_row { background-color: #ffe; color: #444; outline: 1px solid #8b8; }');
    GM_addStyle('.message_summary a:focus {color: #c00; text-decoration: underline;}');

    // XXX: this belongs in multiply-message-board.user.js
    GM_addStyle('#__cfmenu a:focus {color: #c00; text-decoration: underline;}');

//     // set first message as current
//     set_current($('#item_table .mrow').eq(0));

    $(document).keypress(handle_key);
}

function set_current(msg) {
    if (!msg)
	return;

    if (current) {
	current.removeClass('msg_current');
	current.removeClass('msg_current_row');
    }
    current = msg;
    if (current.hasClass('mrow'))
	current.addClass('msg_current');
    else
	current.addClass('msg_current_row');
    make_visible(current);
}

function make_visible(el) {
    var top = el.offset().top;
    if (top < window.scrollY || top + el.height() > (window.scrollY + window.innerHeight))
	el.get(0).scrollIntoView();
}

function is_new(el) {
    return !el.hasClass('uptodate') && el.find('td.read').length == 0;
}

function is_message(el, unread) {
    return (el.hasClass('mrow') || (el.hasClass('bg2') && el.find('td.sep').length < 1))
	&& (!unread || is_new(el));
}

function get_first(unread) {
    return unread 
	? $('#item_table .mrow, #item_table .tablediv1 tr.bg2').filter(function(i) {return is_new($(this));}).eq(0)
	: $('#item_table .mrow, #item_table .tablediv1 tr.bg2').eq(0);
}

function get_next(unread) {
    if (!current || current.length == 0)
	return get_first(unread);

    var msg = current.next();
    while (msg.length && !is_message(msg, unread))
	msg = msg.next();
    return msg.length ? msg : current;
}

function get_prev(unread) {
    if (!current || current.length == 0)
	return get_first(unread);

    var msg = current.prev();
    while (msg.length && !is_message(msg, unread))
	msg = msg.prev();
    return msg.length ? msg : current;
}

function prox_level(prox) {
    return prox * 25;
}

var dummy_scroll_done = false;

function handle_key(e) {
    var msg = null;
    var modifier_pressed = e.ctrlKey || e.altKey || e.metaKey;
    var is_input = e.target.tagName == 'TEXTAREA' || e.target.tagName == 'INPUT';
    debug('handle_key: keycode |' + e.which + '|, modifier_pressed |' + modifier_pressed + '|, target is_input |' + is_input + '|');
    if (modifier_pressed || is_input)
	return;

    switch (e.which) {
	case 106:	// j - next message
	    if (on_inbox_page)
		msg = get_next(false);
	    break;

	case 107:	// k - previous message
	    if (on_inbox_page)
		msg = get_prev(false);
	    break;

	case 74:	// J - next unread message
	    if (on_inbox_page)
		msg = get_next(true);
	    break;

	case 75:	// K - previous unread message
	    if (on_inbox_page)
		msg = get_prev(true);
	    break;

	case 114:	// r - read message
	    if (on_inbox_page)
		visit_current_message(false);
	    break;

	case 82:	// R - read message in new tab
	    if (on_inbox_page)
		visit_current_message(true);
	    break;

	case 115:	// s - focus on the first link of Message Summary
	    if (on_inbox_page)
		focus_message_summary_box();
	    break;

	case 62:	// > - go to next page of message board
	    if (on_inbox_page)
		goto_next_page();
	    break;

	case 60:	// < - go to preivous page of message board
	    if (on_inbox_page)
		goto_prev_page();
	    break;

	case 48:	// 0 - "Mine"
	    if (on_inbox_page)
		set_proximity( prox_level(0) );
	    break;

	case 49:	// 1 - "My Contacts"
	case 50:	// 2 - "Close Network"
	case 51:	// 3 - "Medium Network"
	case 52:	// 4 - "Distant Network"
	    var num = e.which - 48;
	    if (on_inbox_page)
		set_proximity( prox_level(num) );
	    else if (on_album_page)
		unsafeWindow.show_photo(num);
	    break;

	case 97:	// a - album page
	    if (on_album_page)
		goto_album();
	    break;

	case 98:	// b - go back to photo (hi-res page)
	    if (on_hires_page)
		back_to_photo();
	    break;

	case 99:	// c - if custom filters menu is present show it, if shown hide it
	    if (on_inbox_page)
		toggle_custom_filter_menu();
	    break;

	case 103:	// g - toggle groups
	    if (on_inbox_page)
		toggle_groups();
	    break;

	case 110:	// n - next photo
	    if (on_album_page)
		goto_next_photo();
	    break;

	case 112:	// p - previous photo
	    if (on_album_page)
		goto_previous_photo();
	    break;

	case 117:	// u - toggle unread (inbox), up to album page (album)
	    if (on_inbox_page)
		toggle_unread();
	    else if (on_album_page)
		goto_album();
	    break;

	case 122:	// z - zoom photo
	    if (on_album_page)
		zoom_photo();
	    break;

    }

    if (msg && msg.length > 0 && msg.eq(0) != current) {
	if (!dummy_scroll_done) {
	    window.scrollBy(0, 2);
	    dummy_scroll_done = true;
	}
	set_current(msg);
    }
}

function visit_current_message(new_tab) {
    if (current == null) {
	debug('current message not set!');
	return;
    }
    debug('visit_current_message: current.className |' + current.className + '|');
//     debug('visit_current_message: current |' + current.html() + '|');

    var msg_url;

    if (current.hasClass('mrow')) {
	msg_url = current.hasClass('newreplies')
	    ? current.find('.mailreplies a').get(0)
	    : current.find('a').get(1);
    }
    else {
	var msg_subject = current.find('td').
	    filter(function() { return $(this).find('a.mailsubject').length > 0} ).eq(0);
	msg_url = msg_subject.find('a.mailsubject').get(0);
	if (msg_subject.next().text().match(/\d+ new/))
	    msg_url = msg_subject.next().find('a').get(0);
	else if (msg_subject.next().next().text().match(/\d+ new/))
	    msg_url = msg_subject.next().next().find('a').get(0);
    }

    debug('visit_current_message: msg_url |' + msg_url.href + '|');
    if (msg_url) {
	if (new_tab) {
	    GM_openInTab(msg_url.href);
	}
	else {
	    document.location.href = msg_url.href;
	}
    }
}

function goto_next_page() {
    if (!$('.vopt a.voptsel'))
	return;

    var next_page = $('.vopt a.voptsel').eq(0).next();
    while (next_page.length && !next_page.hasClass('vopt'))
	next_page = next_page.next();

    if (!next_page.length)
	return;

    debug('goto_next_page: next_page |' + next_page.get(0).href + '|');
    document.location.href = next_page.get(0).href;
}

function goto_prev_page() {
    if (!$('.vopt a.voptsel'))
	return;

    var prev_page = $('.vopt a.voptsel').eq(0).prev();
    while (prev_page.length && !prev_page.hasClass('vopt'))
	prev_page = prev_page.prev();

    if (!prev_page.length)
	return;

    debug('goto_prev_page: prev_page |' + prev_page.get(0).href + '|');
    document.location.href = prev_page.get(0).href;
}

function focus_message_summary_box() {
    $('.message_summary a:first').each(function() {$(this).get(0).focus();});
}

function set_proximity(prox) {
    document.location.href = 'http://multiply.com/mail?mail:by=prox:' + prox + '%3Bgroup%3Anone';
}

function toggle_groups() {
    var search = decodeURIComponent(document.location.search);
    var m = search.match(/group:(all|none)/);
    if (m) {
	if (m[1] == 'all') {
	    search = document.location.search.replace(/group(:|%3A)all/, 'group%3Anone');
	}
	else {
	    search = document.location.search.replace(/group(:|%3A)none/, 'group%3Aall');
	}
	document.location.search = search;
    }
}

function toggle_unread() {
    var search = decodeURIComponent(document.location.search);
    var is_unread_on = search.match(/mail:unread=on/);

    if (search)
	search = search.replace(/\&?mail:unread=(on|off)?/, '').replace(/[\&\?]+$/, '');

    if (!is_unread_on)
	search += (search.length > 0 ? '&' : '?') + 'mail:unread=on';

    document.location.search = search;
}

// show/hide custom filter menu
function toggle_custom_filter_menu() {
    if (!$('#__cfmenu').length) {
	// if menu doesn't exist yet, trigger the button mouseover event to build it and show
	if ($('#__cfmenu_btn').length > 0)
	    debug('show_custom_filter_menu: custom filter menu not found, but found button');
	trigger_mouse_event('#__cfmenu_btn', 'mouseover');
    }
    else {
	// if menu is already there, just show it and focus on the first link
	debug('show_custom_filter_menu: found custom filter menu');
	if ($('#__cfmenu:hidden').length) {
	    $('#__cfmenu').fadeIn('slow');
	}
	else {
	    $('#__cfmenu').fadeOut('slow');
	}
    }

    if ($('#__cfmenu:not(:hidden)').length)
	$('#__cfmenu a.select:first').focus();
    return;
}

function trigger_mouse_event(el_id, evtype) {
    var el = $(el_id).get(0);
    if (!el) {
	debug('trigger_event: element <' + el_id + '> not found!');
	return;
    }

    var evt = document.createEvent('MouseEvents');
    evt.initEvent(evtype, true, false);
    el.dispatchEvent(evt);
}

function goto_album() {
    var album = $('.itemboxsub .cattitle a');
    if (album.length > 0) {
	album.css({color: '#c00', 'text-decoration': 'underline'});
	document.location.href = album.get(0).href;
    }
}

function goto_next_photo() {
    var next = $('#prevnexttable a:contains("next")');
    if (next.length > 0) {
	next.css({color: '#c00', 'text-decoration': 'underline'});
	goto_photo(next.attr('href').replace('#', ''));
    }
    else {	// old style links
	next = $('.itemsubsub a.go:contains("next")');
	if (next.length > 0) {
	    next.css({color: '#c00', 'text-decoration': 'underline'});
	    document.location.href = next.get(0).href;
	}
    }
}

function goto_previous_photo() {
    var prev = $('#prevnexttable a:contains("prev")');
    if (prev.length > 0) {
	prev.css({color: '#c00', 'text-decoration': 'underline'});
	goto_photo(prev.attr('href').replace('#', ''));
    }
    else {	// old style links
	prev = $('.itemsubsub a.go:contains("prev")');
	if (prev.length > 0) {
	    prev.css({color: '#c00', 'text-decoration': 'underline'});
	    document.location.href = prev.get(0).href;
	}
    }
}

function goto_photo(hash) {
    var index = unsafeWindow.get_index(hash);
    unsafeWindow.show_photo(index);
}

function zoom_photo() {
    document.location.href = $('#zoombutton').each(function() {this.focus();}).get(0).href;
}

function back_to_photo() {
    document.location.href = $('a:contains("Back")').each(function() {this.focus();}).get(0).href;
}
