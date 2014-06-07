/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// Multiply Menus
// version 0.1 ALPHA
// 2006-10-06
// Copyright (c) 2006, Prakash Kailasa <pk-moz at kailasa dot net>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
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
// @name	  Multiply Menus
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Add shortcut sub-menus
// @version	  0.1
// @include	  http://multiply.com/*
// @include	  http://*.multiply.com/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

GM_log('--- start [' + document.location.href + ']---');
if (window.top != window) {
    GM_log('not top window!');
    return;
}

var user = get_userid();
if (!user) {
    GM_log('not logged in!');
    return;
}
var user_site = user_site(user);
var main_site = user_site.replace(new RegExp(user + '\.'), '');

var xpr = document.evaluate('//table[@class="globalnav"]//a',
			    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);;
if (!xpr || xpr.snapshotLength == 0) {
    GM_log("can't find global nav menu");
    return;
}

set_menu_style();

var current_menu = null;

// My Site menu

var mysite_link = xpr.snapshotItem(1);
if (mysite_link) {
    var mysite_menu = {
	'Blog'   		: user_site + '/journal',
	'Photos' 		: user_site + '/photos',
	'Video'  		: user_site + '/video',
	'Music'  		: user_site + '/music',
	'Link'   		: user_site + '/links',
	'Event'  		: user_site + '/calendar',
	'Reviews' 		: user_site + '/reviews'
    };

    add_menu(mysite_menu, mysite_link, 'mysite');
}

// My Network menu

var mynetwork_link = xpr.snapshotItem(2);
if (mynetwork_link) {
    var network_url = main_site + '/network';
    var mynetwork_menu = {
	'Contacts'   		: network_url,
	'Close' 		: network_url + '/close',
	'Medium' 		: network_url + '/medium',
	'Distant' 		: network_url + '/distant',
	'Groups' 		: network_url + '/groups',
    };

    add_menu(mynetwork_menu, mynetwork_link, 'mynetwork');
}

// post menu

var post_link = xpr.snapshotItem(3);
// GM_log('post_link = |' + post_link.href + '|');

if (post_link) {
    var post_menu = {
	'Blog'   		: user_site + '/journal/compose',
	'Photos' 		: user_site + '/photos/upload',
	'Video'  		: user_site + '/video/upload',
	'Music'  		: user_site + '/music/upload',
	'Link'   		: user_site + '/links/compose',
	'Event'  		: user_site + '/calendar/compose',
	'Reviews' 		: user_site + '/reviews/compose',
	'Personal Message' 	: main_site + '/compose/pm'
    };

    add_menu(post_menu, post_link, 'post');
}

GM_log('--- end ---');

function get_userid()
{
    var xpr = document.evaluate('//span[@class="signoutid"]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    // GM_log('xpr = |' + xpr + '|, xpr.singleNodeValue = |' + xpr.singleNodeValue + '|');
    if (xpr.singleNodeValue) {
	userid = xpr.singleNodeValue.textContent;
	return userid.replace(/^\s+|\s+$/g, '');
    } else {
	return '';
    }
}

function user_site(userid)
{
    return 'http://' + userid + '.' + document.location.host.replace(/^.*\.?multiply\./, 'multiply.');
    // return 'http://' + userid + '.' + document.location.host.replace(new RegExp('^' + userid + '\.'), '');
}

function set_menu_style()
{
    GM_addStyle("ul.pk_sub_menu { position: absolute; left: 0 /* -1000px */; top: 32; z-index: 1000; list-style: none; min-width: 10em; margin: 0; padding: 0; border-style: solid; border-width: 0 1px 1px 1px; text-align: left; white-space: nowrap; display: none; }");
    GM_addStyle("ul.pk_sub_menu:hover { display: block; }");
    GM_addStyle("ul.pk_sub_menu li { margin: 2px; padding: 2px 3px 2px 20px; font-size: 80%; list-style-image: none; }");
    GM_addStyle("ul.pk_sub_menu li { font-weight: bold; }");
    GM_addStyle("ul.pk_sub_menu li a { height: 32px; margin: 2px; text-decoration: none; }");
//     GM_addStyle("ul.pk_sub_menu li a:hover { text-decoration: underline; color: #c00; }");

    // menu background
    var xpr = document.evaluate('//div[@class="header"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (xpr) {
	var header_div = xpr.singleNodeValue;
	var header_style = document.defaultView.getComputedStyle(header_div, null);
	if (header_style) {
	    var props = new Array('background-attachment', 'background-color', 'background-image',
				  'background-repeat', 'border-right-color', 'border-left-color',
				  'border-bottom-color');
	    var style = "";
	    for (var i in props) {
		// GM_log('ul.pk_sub_menu:' + props[i] + ': ' + header_style.getPropertyValue(props[i]));
		style += props[i] + ': ' + header_style.getPropertyValue(props[i]) + '; ';
	    }
	    if (header_style.getPropertyValue('background-color') == 'transparent' && header_style.getPropertyValue('background-image') == 'none') {
		// special case for Avlack theme
		var body_style = document.defaultView.getComputedStyle(document.body, null);
		if (body_style.getPropertyValue('background-image') != 'none')
		    style += 'background-image: ' + body_style.getPropertyValue('background-image') + '; ';
		if (body_style.getPropertyValue('background-color') != 'transparent')
		    style += 'background-color: ' + body_style.getPropertyValue('background-color') + '; ';
	    }
	    GM_addStyle("ul.pk_sub_menu { " + style + " }");
	}
    }

    xpr = document.evaluate('//li[@class="gnopt"][2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (xpr) {
	var hdr_link = xpr.singleNodeValue;
	// GM_log('hdr_link = ' + hdr_link.getAttribute('href'));
	var hdr_link_style = document.defaultView.getComputedStyle(hdr_link, null);
	if (hdr_link_style) {
	    // GM_log('hdr_link_style color = ' + hdr_link_style.getPropertyValue('color'));
	    GM_addStyle("ul.pk_sub_menu li a:link, ul.pk_sub_menu li a:visited { color: " + hdr_link_style.getPropertyValue('color') + " }");
	    GM_addStyle("ul.pk_sub_menu li a:hover { color: #c00; }");
	}
	/*
	var hdr_link_visited_style = document.defaultView.getComputedStyle(hdr_link, 'visited');
	if (hdr_link_visited_style) {
	    GM_log('hdr_link_visited_style color = ' + hdr_link_style.getPropertyValue('color'));
	    GM_addStyle("ul.pk_sub_menu li a:visited { color: " + hdr_link_visited_style.getPropertyValue('color') + " }");
	}
	var hdr_link_hover_style = document.defaultView.getComputedStyle(hdr_link, 'hover');
	if (hdr_link_hover_style) {
	    GM_log('hdr_link_hover_style color = ' + hdr_link_style.getPropertyValue('color'));
	    GM_addStyle("ul.pk_sub_menu li a:hover { " + hdr_link_hover_style.getPropertyValue('color') + " }");
	}
	*/
    }
}


// attach menu of items to elem
function add_menu(items, elem, id)
{
    var menu = make_menu(items);
    menu.id = 'sub_menu_' + id;
    // GM_log('elem = |' + elem + '|, parent = |' + elem.parentNode + '|');
    elem.parentNode.style.position = "relative";
    elem.parentNode.appendChild(menu);
    elem.addEventListener("mouseover", function() {show_menu_deferred(menu, elem)}, false);
    elem.addEventListener("mouseout", function() {clear_timer()}, false);
    menu.addEventListener("mouseover", function() {show_menu(menu)}, false);
    menu.addEventListener("mouseout", function() {hide_menu(menu)}, false);
    menu.addEventListener("click", function() {hide_menu(menu)}, false);
    // GM_log('add_menu: done');
}

// create menu and add to document, but not show it yet
function make_menu(items)
{
    var menu = document.createElement('ul');
    menu.className = 'pk_sub_menu';

    for (var item in items) {
	var menu_item = document.createElement('li');
	var item_link = document.createElement('a');
	item_link.textContent = item;
	item_link.href = items[item];
	menu_item.appendChild(item_link);
	menu.appendChild(menu_item);
	// GM_log('make_menu: item ' + item + ' added.');
    }

    // GM_log('make_menu: done');
    return menu;
}

// from http://www.quirksmode.org/js/findpos.html
function findPos(obj)
{
    var curleft = curtop = 0;
    if (obj.offsetParent) {
	curleft = obj.offsetLeft;
	curtop = obj.offsetTop;
	while (obj = obj.offsetParent) {
	    curleft += obj.offsetLeft;
	    curtop += obj.offsetTop;
	}
    }
    return [curleft, curtop];
}

var show_menu_timer = null;

function show_menu_deferred(menu, link)
{
    show_menu_timer = setTimeout(function() { display_menu(menu, link) }, 500);
}

// position and show menu just below the link
function display_menu(menu, link)
{
    if (current_menu != null)
	hide_menu(current_menu);

    var parent = link.parentNode;
    var pos = findPos(parent);
    menu.style.position = "absolute";
    menu.style.left = 0;
    var top = pos[1] + parent.clientHeight;
    menu.style.top = top + 'px';
    menu.style.display = "block";

    current_menu = menu;

//     setTimeout(function() {hide_menu(menu)}, 5000);
}

// show menu
function show_menu(menu)
{
    menu.style.display = "block";
}

function hide_menu(menu)
{
//     menu.style.left = "-1000px";
    menu.style.display = "none";
    if (menu == current_menu)
	current_menu = null;
}

function clear_timer()
{
    if (show_menu_timer != null) {
	clearTimeout(show_menu_timer);
	show_menu_timer = null;
    }
}
