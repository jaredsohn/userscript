// Removes the intro video and the ad video from gamespot streams.
// version 1.1
// 2006-01-22
//
//
// ==UserScript==
// @name           Gamespot: remove video-ad
// @namespace      http://determinist.org
// @description    Removes the intro video and the ad video from gamespot streams.
// @include        http://www.gamespot.com/pages/video_player/popup.php*
// ==/UserScript==

//Changelog:

//2006-05-13	1.1	* Some changes in gamespots html, script fixed accordingly
//2006-01-22	1.0	* Initial version

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson, arvid.jakobsson@gmail.com

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

function xpath(query, context) {
	context = context ? context : document;
	return document.evaluate(query, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


//Change these if you want to
var REMOVE_AD = true;
var REMOVE_INTRO = false;

//Replace the node so the video will restart. Is this possible in some other way?
var videodiv = document.getElementById('WMPlay');
var my_videodiv = videodiv.cloneNode(true);

//Change the src attribute of the embed element
var embed = xpath("./embed", my_videodiv);
embed = embed.snapshotItem(0);
var oldurl = embed.getAttribute('src');

var newurl = oldurl.split('&');

for (var i = 0; i < newurl.length; i++) {
	if (newurl[i].match(/^prestream=/i) && REMOVE_AD) {
		newurl.splice(i, 1);
		i--;
	}
	
	if (newurl[i].match(/^first=/i) && REMOVE_INTRO) {
		newurl.splice(i, 1);
		i--;
	}
}

newurl = newurl.join('&');

embed.setAttribute('src', newurl);
videodiv.parentNode.replaceChild(my_videodiv, videodiv);
