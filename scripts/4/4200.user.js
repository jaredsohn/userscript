// ==UserScript==
// @name	Flickr group search
// @namespace	http://6v8.gamboni.org/
// @description add a direct group search box when you are reading a group thread.
// @version        0.1
// @identifier	http://6v8.gamboni.org/IMG/js/flickrgroupsearch.user.js
// @date           2006-05-24
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/groups/*/discuss/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2006 Pierre Andrews
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
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA


(function () {

	var hint = document.evaluate("//td[@id='Hint']/p/a",
								 document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	if(hint) {
		var gp_id = hint.href.split('=');
		gp_id = gp_id[1];
		var search = hint.parentNode.appendChild(document.createElement('span'));
		search.className = "TopicListing";
		search.innerHTML = '<h4 style="padding-top: 5px;">Or, Search discussions:</h4>\
			 <form method="get" action="/search/groups/">\
			 <input type="hidden" value="'+gp_id+'" name="w"/>\
			 <input type="text" style="width: 130px;" name="q"/>\
			 <input type="submit" value="SEARCH" class="SmallButt"/>\
			 </form>';			 
	}
	
})();
