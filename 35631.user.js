// ==UserScript==
// @name           Flickr More Activity Links
// @namespace      http://www.jakob.at/greasemonkey/
// @description Adds links to flickr's activity pages to the "You" menu, the buddy icon menu and to flickr's homepage.
// @version 0.5
// @creator Steffen A. Jakob (http://www.flickr.com/photos/steffenj/)
// @include        http://*flickr.com/*
// ==/UserScript==
//
// Copyright (C) 2008 Steffen A. Jakob
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
// http://www.gnu.org/copyleft/gpl.html
// or by writing to
// Free Software Foundation, Inc.
// 51 Franklin Street, Fifth Floor
// Boston, MA  02110-1301
// USA

// Changelog
// 2008-11-19 0.5
//	Removed links from activity pages which are now already included in the original pages.
//	Renamed links.
//	Added a link to customized activity page to the 'You' menu.
//	Added links to several activities pages to the buddy icon drop down menu.
// 2008-10-20 0.4 Moved homepage link to the top of the page.
// 2008-10-20 0.3 Added mine, others, both links to the homepage.
// 2008-10-18 0.2 Added a "both" link.
// 2008-10-18 0.1 First version.

// Links and labels from activity pages.
var activity_all = '/activity/all/';
var activity_mine = '/activity/photostream/';
var activity_others = '/activity/replies/';
var activity_customized = '/activity/customized/';

var txt_all = 'All activities';
var txt_mine = 'Activity on my photos';
var txt_others = 'Replies to my comments';
var txt_customized = 'Customized activities';

// Add links to the "You" menu.
var menus = document.evaluate('//div[@id="candy_nav_menu_you"]/a[@href="/activity/"]', 
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (menus.snapshotLength > 0) {
	var menu = menus.snapshotItem(0);
	menu.innerHTML += ' (default)';
	var link = createLink(activity_all, txt_all, menu, '');
	link = createLink(activity_mine, txt_mine, link, '');
	link = createLink(activity_others, txt_others, link, '');
	createLink(activity_customized, txt_customized, link, '');
}

// Add links in the drop down menu from the buddy icon.
var buddyLink = document.getElementById('personmenu_activity_link');
if (buddyLink) {
	buddyLink.innerHTML += ' (default)';
	var link = createLink(activity_all, 'All activities', buddyLink, buddyLink.getAttribute('class'));
	link = createLink(activity_mine, 'Activity on my photos', link, buddyLink.getAttribute('class'));
	link = createLink(activity_others, 'Replies to my comments', link, buddyLink.getAttribute('class'));
	link = createLink(activity_customized, 'Customized activities', link, buddyLink.getAttribute('class'));
	
	var line = document.createElement('div');
	line.setAttribute('class', 'menu_item_line_above');
	buddyLink.parentNode.insertBefore(line, buddyLink);
	line.appendChild(buddyLink);

	link = link.nextSibling;
	line = document.createElement('div');
	line.setAttribute('class', 'menu_item_line_above');
	link.parentNode.insertBefore(line, link);
	line.appendChild(link);
}

// Add activity links to flickr's homepage.
if (endsWith(window.location.href, 'flickr.com/')) {
	var href = document.getElementById('tt-view-activity');
	if (href) {
		href.parentNode.innerHTML +=
			' (<a href="' + activity_all + '">all</a>, ' +
			'<a href="' + activity_mine + '">mine</a>, ' + 
			'<a href="' + activity_others + '">others</a>, ' + 
			'<a href="' + activity_customized + '">customized</a>)';
	}
}

// Helper function for creating hyperlinks.
function createLink(href, text, previous, cls) {
	var link = document.createElement('a');
	link.setAttribute('href', href);
	link.appendChild(document.createTextNode(text));
	if (cls.length > 0) {
		link.setAttribute('class', cls);
	}
	previous.parentNode.insertBefore(link, previous.nextSibling);
	return link;
}

// Tests if string 'str' ends with 's'.
function endsWith(str, s){
	var reg = new RegExp(s + '$');
	return reg.test(str);
}
