// Reddit Mark Unread Comments 1.0

// ==UserScript==
// @name          	Reddit Mark Unread Comments
// @namespace     	http://determinist.org/greasemonkey/
// @description   	Like it says, marks unread comments with a little flag. Version 1.0

// @include       	http://reddit.com/info/*/comments*
// @include       	http://*.reddit.com/info/*/comments*

// ==/UserScript==

/*

Changelog:

2006-08-13	1.0
* First release

*/

/*
BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

//customize here
var unread_icon = "data:image/gif,GIF89a%10%00%10%00%E6%00%00%A5%00%00%D5%D5%D5%A7%84w%3A%3A%3A%D7%00%00%B0%B0%B0%E8%1D5%C04%00%B9qm%1E%1E%1E%FF%FF%FF%B3%3B%3B%D9%1F%00%CF%AF%B3%E2%00%15%99%99%99%C9%8A%91ccc%BC%00%00%CFO_%F0%F0%F0%CC%CC%CC%F8%01%00%F3p%7D%99%88%81%AAL%26%7FK7%E7%00%00%FD%A0%AB%AFbC%7C%7C%7C%E2%88p%E9%20%20%DB%3BO%F8%00%1C%BF6%00%BC%BC%BC%88eX%CE%00%0F%EA%90%90%AB%00%00%E9%C0%C0%E8%E8%E8%D5%00%11%B4dd%DF%1A%00%C4%00%00%E8%13%00KKK%D9'%3A%C3C%10%F8%0A%26%A6%A6%A6%AFud%C50%00%B0%00%05%A6%95%98%DC%DC%DC%B5%B5%B5%FA%FA%FA%C4%C4%C4%CC%00%00%F0%00%1A%E3%A8%90%FE%00%1E%B3%3A%0B%A7%0A%0A%E5%15%00%CD*%00%F6%06%00%D2*%0A%B6%00%00%DC%00%00%ED%1D7%BD%00%09%D5PX%EF%00%00%DC%00%13%C4%00%0C%DE!%00%B7%00%07%B4ww%E9%00%18%ED%C0%C0%EE%0D%00%BC%3C%09%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%07%00%FF%00%2C%00%00%00%00%10%00%10%00%00%07%A1%80%0A%82%83%84%0A%17%1C%85%0A%1FC%16%20'S)K%0E%069%84%3F6-E%1B%3D%12%00J%2B%22%10%842%07%0CEL%04%9D7%26%3E!*%82%3AU%23DT%16H.((%26R%40%0D%82%01%1D%B3%2F%16%9BG%00N%0E%40%13%14%0A%3B%18%23%98%C4%3D%C6JM%223%15%B0%196%A6%A8%9DP%2B%3EI4%82%14%25%07F%08Q%2C%0BB%AB18%05%83%0FA54**9%3C4%FC%3A%3B%8394%08%A8%94(%91%87%08%AF%0A%16%221%80%84%C2D0%22%FC%7B8%A8%40%82l%14%01%92%2B%18%08%00%3B";
var unread_style = '.unread { background: url("' + unread_icon + '") top left no-repeat; padding-bottom: 16px; padding-left: 18px; }'


GM_addStyle(unread_style);

var article_id = location.href.match(/http:\/\/(.*\.)?reddit.com\/info\/([^\/]*)/)[2];
var readcomments = getReadComments();

markUnreadComments();


function getReadComments() {
	var readcomments = GM_getValue(article_id, false);
	readcomments = readcomments ? readcomments.split(',') : [];
	return readcomments;
}

function markUnreadComments() {
	var newreadcomments = new Array();
	foreachxp("//tr[starts-with(@id, 'display')]", function (el) {
		var id = el.id.replace('display', '');
		if (readcomments.indexOf(id) == -1) {
			newreadcomments.push(id);
			xpathOne(".//span[@class='little']", el).setAttribute('class', 'little unread');
		}
	});
	GM_setValue(article_id, Array.concat(readcomments, newreadcomments).join());
}


function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function foreachxp(xp, fc, context) {
	var els = xpath(xp);
	if (els) {
		for (var i = 0; el = els.snapshotItem(i); i++) {
			fc(el);
		}
	}
}

function xpathOne(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function removeWithXP(query, context) {
	var els, el, i;
	
	els = xpath(query, context);
	for (i = 0; el = els.snapshotItem(i); i++)
		el.parentNode.removeChild(el);
}

function $(id) {
	return document.getElementById(id);
}

/*
GM_addStyle('#first_unread_link { z-index: 32767; position: absolute; left: 0px; top: 0px; }');
GM_addStyle('#first_unread_link > a { visibility: hidden; }');
GM_addStyle('#first_unread_link:hover > a { visibility: visible; }');

addGotoFirstUnreadLink();

function addGotoFirstUnreadLink() {
	var firstUnreadDiv = document.createElement('div');
	firstUnreadDiv.setAttribute('id', 'first_unread_link');
	
	var firstUnreadLink = document.createElement('a');
	firstUnreadLink.href = "javascript:;";
	firstUnreadLink.addEventListener('click', gotoNextUnread, true);
	
	var firstUnreadImg = document.createElement('img');
	firstUnreadImg.src = unread_icon;
	
	firstUnreadLink.appendChild(firstUnreadImg);
	firstUnreadDiv.appendChild(firstUnreadLink);
	document.body.appendChild(firstUnreadDiv);
}

function gotoNextUnread(e) {

}
*/
