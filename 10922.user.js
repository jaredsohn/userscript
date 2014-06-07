// ==UserScript==
// @name           B3ta Bash Events Pictures
// @namespace      http://code.leekelleher.com
// @description    Inserts pictures from Flickr into B3ta Bash event page.
// @version        1.0
// @identifier	   http://code.leekelleher.com/greasemonkey/b3tabasheventspictures.user.js
// @date           2007-07-25
// @creator        Lee Kelleher (lee@vertino.net)
// @include        http://b3ta.com/calendar/event/*
// @include        http://*.b3ta.com/calendar/event/*
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
// Copyright (C) 2007 Lee Kelleher
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

var pageURL = new String(window.location);
var str = pageURL.split(/\//g);
var eventID = parseInt( str[str.length - 1] );

if ( typeof(eventID) == 'number' )
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.flickr.com/services/feeds/photos_public.gne?tags=b3ta:bash=' + eventID + '&format=json',
		onload: function(responseDetails)
		{
			eval( responseDetails.responseText )
		}
	});
}
	
function jsonFlickrFeed(json)
{
	if ( (json.items != null) && (json.items.length > 0) )
	{
		var post = document.getElementById("post" + eventID);
		if (post)
		{
			var invite = getElementsByClass("invite", post, "div");
			if ( (invite) && (invite.length > 0) )
			{
				var maxPhotos = (json.items.length >= 7) ? 7 : json.items.length;
				var out = "";
				
				for (var i = 0; i < maxPhotos; i++)
				{
					var photo = json.items[i];
					out += '<a href="' + photo.link + '" target="_blank"><img src="' + photo.media['m'].replace('_m.jpg', '_s.jpg') + '" alt="[Photo of ' + photo.title + ']" title="' + photo.title + '" style="border:solid 1px black;margin:2px;padding:2px;" /></a>';
				}
				
				invite[0].innerHTML += '<br><br><div><b><a href="' + json.link + '" target="_blank">tagged flickr photos from this event</a></b><br>' + out + '</div>';
			}
		}
	}
}

// borrowed from here: http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null ) node = document;
	if ( tag == null ) tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
