/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// Multiply Show New Replies Separator
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
// select "Multiply Show New Replies Separator", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	  Multiply Show New Replies Separator
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Display an indicator to separate new messages from old.
// @description   Note: Must click on the 'N replies' link on the Explore page for this to work.
// @description   Note: Works only in chronological view
// @version	  0.1
// @include	  http://*.multiply.com/*#*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

var hash = document.location.hash;
if (!hash || !hash.match(/^#reply\d+$/)) {
    return;
}

var anchor = hash.replace('#', '');
// var xpath = document.evaluate('a[name="' + anchor + '"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
// GM_log('xpath = ' + xpath);
// var anchor_el = xpath.singleNodeValue;
var anchor_el;
for (var i = 0, a; a = document.anchors.item(i); i++) {
    if (a.name == anchor) {
	anchor_el = a;
	break;
    }
}
if (!anchor_el) {
    GM_log('anchor element ' + hash + ' not found');
    return;
}

var replybox = anchor_el.nextSibling;

var new_reply_sep = document.createElement('div');
var down_arrow = 'http://images.multiply.com/common/arrow-down.gif';
new_reply_sep.innerHTML = '<img src="' + down_arrow + '"> &nbsp; New Replies &nbsp; <img src="' + down_arrow + '">';
new_reply_sep.id = 'new_msg_sep';
new_reply_sep.class = 'sep';
new_reply_sep.style.textAlign = 'center';
new_reply_sep.style.fontWeight = 'bold';
new_reply_sep.style.backgroundColor = '#ddd';
new_reply_sep.style.borderColor = '#000';
new_reply_sep.style.borderWidth = '1px';
new_reply_sep.style.borderStyle = 'solid';

replybox.parentNode.insertBefore(new_reply_sep, replybox);
