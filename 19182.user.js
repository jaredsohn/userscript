// ==UserScript==
// @name	Flickr Photophlow links
// @namespace	http://6v8.gamboni.org/
// @description Add links to groups and buddy icons to access their PhotoPhlow rooms.
// @version        0.1
// @identifier	http://6v8.gamboni.org/IMG/js/flickrphotophlowlinks.user.js
// @date           2008-01-05
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/*
// @exclude http://*flickr.com/photos/*/alltags* 
// @exclude http://*flickr.com/photos/organize*
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
// Copyright (C) 2008 Pierre Andrews
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

	var FlickrBuddyMenuTool = function() {};

	FlickrBuddyMenuTool.prototype = {

		/**
		 * insertItem: insert a new item in the buddy menu, after the "Contacts" item.
		 *
		 *  param title: the title of the item, what will be shown to the user.
		 *  callback: a function to callback when the user clicks on that menu item. The user nsid will be passed to the callback as first parameter. The id will be passed as second parameter , the received click event will be passed as last parameter.
		 *  id: a unique id for this item, to know what item was clicked if you use the same callback for different items.
		 */
		insertItem: function(title, callback, id) {		
			var menu = document.getElementById('personmenu_contacts_link');
			if(menu) {
				var link =document.createElement('a');
				link.setAttribute('class','block');
				link.setAttribute('id','tag_person_link');
				link.setAttribute('href','javascript:;');
				link.addEventListener('click',function(ev) {
						var block = ev.target.parentNode;
						var matches = /messages_write\.gne\?to=([^"]*)"/.exec(block.innerHTML);
						if(matches) {
							callback(matches[1],id, ev);
						}			
					},true);
				link.textContent=title;
				
				menu.parentNode.insertBefore(link,menu.nextSibling);
			}
		}
	}


	//User menu
	var tool = new FlickrBuddyMenuTool();
	tool.insertItem('Photophlow Room', function(user_id, call_id, event) {
			if(call_id == 'photophlow') {
				GM_openInTab('http://www.photophlow.com/flickr/user/'+user_id);
			}
		},'photophlow');
	
	var links = document.evaluate(
								  "//td[@class='Section']/p[@class='Links']",
								  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
								  ).singleNodeValue;


	//group links
	if(document.location.pathname.indexOf('/groups') ==0) {
		var a = links.getElementsByTagName('a');
		var id;
		for(var i=0;i<a.length;i++) {
			if(a[i].href.indexOf('?id=') >= 0)
				id = a[i].href.split('?id=')[1];
		}
		if(id) {
			links.innerHTML += '<img width="1" height="11" alt="" src="/images/subnavi_dots.gif"/>';
			links.innerHTML += '<a href="http://www.photophlow.com/flickr/group/'+id+'">PhotoPhlow Room</a>';
		}
	}

})();
