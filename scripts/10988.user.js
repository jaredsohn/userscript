/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Multiply Message Board Plus
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Show Unread/All Messages link on Multiply Inbox and easy access to custom filters
// @version	  0.8
// @include	  http://multiply.com/mail/*
// @include	  http://multiply.com/mail?*
// @include	  http://multiply.com/mail
// @exclude	  http://multiply.com/mail/message/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

const DEBUG = false;

// PREF: If true, "Show Unread" link is added
const pref_add_unread_link = true;

// PREF: If true, page is reloaded every 10 minutes
const pref_reload_auto = true;
const pref_auto_reload_freq =  10 * 60 * 1000; /* 10 minutes */ 

// PREF: If true, user/group msg filter icons are shown
// (before the user/group ids in the line after the message subject)
const pref_add_user_msg_filters = true;

// PREF: If true, Custom Filter menu is added
const pref_add_custom_filer_list = true;

// PREF: If true, Custom Filter Menu links are not sticky
// (does NOT affect the links in the main Custom Filter list)
const pref_filters_nopref = true;

// PREF: If true, Custom Filter links show only unread messages
// (does NOT affect the links in the main Custom Filter list)
const pref_filters_unread = true;

function debug(str) {
    if (DEBUG) {
	var now = '[' + new Date() + '] ';
	GM_log(now + str);
    }
}

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

function insertAfter(newNode, node) {
    return node.parentNode.insertBefore(newNode, node.nextSibling);
}

/* add unread link */

if (pref_add_unread_link) {
    unread_link = add_unread_link();

    var unread_status = false;
    var m;
    if (m = document.location.search.match(/(\&?mail:unread=(on|1)?)/)) {
	debug(m.join("/"));
	debug('[0] ' + document.location.href);
	if (m[2] == 'on' || m[2] == '1') {
	    unread_status = true;
	}
	unread_link.href = document.location.href.replace(/\&?mail:unread=(on|1)?/, '');
	unread_link.href = unread_link.href.replace(/\?$/, '');
    }
    debug('unread_status = ' + unread_status);
    debug('[0] unread_link =' + unread_link.href);

    // if (document.location.search.match(/mail:unread=(on|1)/)
    if (unread_status) {
	unread_link.textContent = 'Show All';
    } else {
	unread_link.textContent = 'Show Unread';
	unread_link.href = unread_link.href.replace(/reset=1/, '');
	if (document.location.search) {
	    unread_link.href = unread_link.href + (document.location.search.match(/^\?./) ? '&mail:unread=on' : '?mail:unread=on');
	    debug('[3] ' + unread_link.href);
	} else {
	    unread_link.href = unread_link.href.replace(/\?$/, '') + '?mail:unread=on';
	    debug('[4] ' + unread_link.href);
	}
    }
}

/* set to reload periodically, but only for the Explore page */

if (pref_reload_auto && on_inbox()) {
    debug('setting up auto reload every ' + pref_auto_reload_freq + ' ms... ');
    window.setTimeout(function() {
			   debug('reloading inbox page');
			   window.location.reload();
		       }, pref_auto_reload_freq );
}

/* add custom filter menu */

if (pref_add_custom_filer_list) {
    var cfilters = get_custom_filters();
    add_custom_filter_menu(cfilters);
}

/* add user/group message filter links */

var g_loc_url = document.location.href.replace(/\?.*$/, '');
if (pref_add_user_msg_filters) {
    add_user_message_filers();
}

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

function get_custom_filters()
{
//     var h4s = Array.filter(document.getElementsByTagName('h4'),
// 			      function(el) {
// 				  return el.textContent.match(/Saved Filters/) && el.nextSibling.tagName == 'TABLE';
// 			      });

//     if (h4s.length < 1) {
// 	debug('get_custom_filters: Saved Filters section not found');
// 	return;
//     }

//     var tbl_filters = h4s[0].nextSibling;

    var tbl_filters = $x('//div[@id="display_options"]/div[@class="savedfilters"]//table')[0];

    if (tbl_filters && tbl_filters.rows.length > 0) {
	debug('get_custom_filters: filters table found.');
	var filters = new Array();
	for (var i = 0, row; row = tbl_filters.rows[i]; i++) {
	    for (var j = 0, cell; cell = row.cells[j]; j++) {
		var f_links = Array.filter(cell.childNodes,
					   function(el) {return el.tagName == 'A';});
		f_links.forEach(function(el) {
				    var link = el.cloneNode(true);
				    if (pref_filters_unread || pref_filters_nopref) {
					link.href = set_link_options(link.href);
				    }
				    filters.push(link);
				});
	    }
	}

	debug('get_custom_filters: ' + filters.length + ' filters found.');
	return filters;
    }
    else {
	debug('get_custom_filters: filtes table not found!');
	return null;
    }
}

function set_link_options(href) {
    if (pref_filters_unread && !href.match(/mail:unread=(1|on)/)) {
	href = href.replace(/&?mail:unread=/, '') + '&mail:unread=on';
    }
    if (pref_filters_nopref && !href.match(/nopref=1/)) {
	href = href.replace(/&?nopref=/, '') + '&nopref=1';
    }
    return href.replace(/&+/g, '&').replace(/&$/, '').replace(/\?&/, '?');
}

// function x(e) {debug('event |' + e.type + '|, target |' + (e.target.id || e.target) + '|, relatedTarget |' + (e.relatedTarget ? (e.relatedTarget.id || e.relatedTarget) : '') + '|')};

function add_custom_filter_menu(filters) {
    if (!filters || filters.length < 1)
	return;

    var f_menu = make_menu(filters);
    if (!f_menu)
	return;

    f_menu.addEventListener('click', function(e) {hide_menu(f_menu)}, false);
    f_menu.addEventListener('mouseout', function(e) {hide_menu(f_menu)}, true);

    var custom_el = get_custom_element();
    var list_btn = document.createElement('div');
    list_btn.id = '__cfmenu_btn';
//     list_btn.textContent = " \u21D3 ";	// downwards double arrow
//     list_btn.textContent = " \u274F ";	// lower right drop-shadowed white square
    list_btn.textContent = " \u25BC ";		// black down-pointing triangle
    list_btn.addEventListener('mouseover', function(e) {show_menu(f_menu, list_btn);}, false);

    custom_el.parentNode.insertBefore(list_btn, custom_el);
}

function get_custom_element() {
    return document.getElementById('custom')
	|| document.getElementById('belowlinefloatright').firstChild;
}

function show_menu(menu, ref) {
    ref.style.position = 'relative';
    menu.style.position = 'absolute';
    menu.style.top = '3px';
    menu.style.left = '5px';
    menu.style.zIndex = 1000;
    menu.style.display = '';
    ref.appendChild(menu);
}

function hide_menu(menu) {
    if (!menu)
	return;
    menu.style.display = 'none';
//     if (menu.parentNode)
// 	menu.parentNode.removeChild(menu);
}

function make_menu(list) {
    var menu = document.getElementById('__cfmenu');

    if (!menu) {
	GM_addStyle('#__cfmenu_btn { margin: 3px 0 0 3px; cursor: pointer; font-size: 14px; color: #0B5EB4; } #__cfmenu_btn:hover { color: #c00; }');
	GM_addStyle('ul.__cflist { list-style: none; border: 1px solid #FFD65C; background-color: #FFFFCE; padding: 2px; font-size: .8em; width: 20em; -moz-border-radius: 5px; }');
	GM_addStyle('ul.__cflist li { margin: 1px 0 0 5px; }');
	GM_addStyle('ul.__cflist li:hover a { color: #c00; }');

	menu = document.createElement('ul');
	menu.id = '__cfmenu';
	menu.className = '__cflist';
	list.forEach(function(el) {
			 var li = document.createElement('li');
			 li.appendChild(el);
			 menu.appendChild(li);
		     });
	GM_addStyle('#__cfmenu a:focus {color: #c00; text-decoration: underline;}');
    }

    return menu;
}

/* message filters for user/group links */

function add_user_message_filers() {
    GM_addStyle('.__msg_filter_icon { width: 10px !important; height: 10px !important; vertical-align: middle !important; border-width: 0; }');
    GM_addStyle('.__msg_filter_link { padding: 0 2px; text-decoration: none; }');
    var links = $x("//div[@class='mailby']/a");
    links.forEach(add_message_filter);
}

function add_message_filter(link) {
    // debug('add_message_filter: link = |' + link.href + '|');

    var uid = link.hostname.split(".")[0];

    // there isn't a direct way to determine if the link points to a group or user.
    // let's assume it's a group if the link node is followed by a text node that
    // says "member", otherwise it's a user

    var next = link.nextSibling;
    var is_group = next && next.nodeType == 3 && next.textContent.match(/member/);
    var icon_src;
    var mail_by;
    if (is_group) {
	icon_src = 'http://images.multiply.com/multiply/icons/clean/24x24/group.png';
	mail_by = 'group:' + uid;
    }
    else {
	icon_src = 'http://images.multiply.com/multiply/icons/clean/24x24/contact.png';
	mail_by = 'user:' + uid;
    }
    var filter = document.createElement('a');
    filter.className = '__msg_filter_link';
    filter.href = g_loc_url + '?nopref=1&mail:by=' + encodeURIComponent(mail_by);
    filter.setAttribute('title', 'Show recent posts from ' + link.textContent);
    // debug('add_message_filter: ' + uid + ' |' + filter.href + '|');

    var icon = document.createElement('img');
    icon.src = icon_src;
    icon.className = '__msg_filter_icon';

    filter.appendChild(icon);

//     insertAfter(filter, link);
    link.parentNode.insertBefore(filter, link);
}

function on_inbox() {
    debug('on_inbox: link |' + window.location.href + '|');
    return window.location.href.match(/\/(mail$|mail\?|mail\/updates\/.*?\/\d+)/);
}

/*-----------------------------------------------------------------------------------
 * Change Log:
 *
 * 0.8  2008/07/18  fixed auto-reload
 *
 * 0.7  2008/02/29  added unread pref for custom filter links; and some cleanup
 *
 * 0.6  2007/12/07  Fix custom filters menu breakage caused by new release
 *
 * 0.5  2007/11/21  style tweak for filter icons in table view
 *
 * 0.4  2007/11/20  style rule for filter links when focused
 *
 * 0.3  2007/08/02  Show user/group icons near user/group links; clicking on icons
 *                  filters the Message Board to show posts by user/group only
 *
 * 0.2  2007/08/01  Added @includes to cover more cases
 *
 * 0.1  2007/07/26  Initial version (supersedes multiply-unread.user.js);
 *                  Add Custom Filter Menu
-----------------------------------------------------------------------------------*/
