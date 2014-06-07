// Helgon-alert 1.1b

// ==UserScript==
// @name		Helgon-alert
// @namespace	tag:http://arvixx.blogspot.com,2005-08-09:Helgon-alert.
// @description	This scripts plays the SOUND_SRC sound whenever you get a new message etc on the swedish community Helgon. Version 1.1b
// @include	http://www.helgon.net/frameset/new.asp
// @include	http://helgon.net/frameset/new.asp
// ==/UserScript==

/*

This scripts plays the SOUND_SRC sound whenever you get a new message etc on the swedish community Helgon.

/*

Changelog:

2005-08-24 1.1b
* Small fix, fixed a typo which broke the script. Goddamnit :)

2005-08-23 1.1
* Rewrote the script, since I accidently deleted the old version.
* Some preparations for public release.

2005-08-* 1.0
* Initial version.

*/

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson / arvid.jakobsson@gmail.com

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

var SOUND_SRC = "http://webdesignskolan.com/html/ljud/glass.wav"; 	//Source of the "alert"-sound
var VOLUME = "100";													//Volume of the sound. 0-100 I think.

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var css_link = document.getElementsByTagName("link")[0].href;
var theme = css_link.substring(css_link.indexOf("/CSS/")+5, css_link.indexOf("/CSS/")+6);

var imgs = xpath("//IMG");
for (var i = 0; i < imgs.snapshotLength-1; i++) {
	var img = imgs.snapshotItem(i);
	if (img.src.indexOf("helgon.net/picz/" + theme + "/0_") != -1 || 
		img.src.indexOf("helgon.net/picz/" + theme + "/1_") != -1) {
		body = document.getElementsByTagName("body")[0];
		
		var emb = document.createElement("embed");
		emb.src = SOUND_SRC;
		emb.setAttribute("autostart", "true");
		emb.setAttribute("loop", "false");
		emb.setAttribute("hidden", "true");
		emb.setAttribute("volume", VOLUME);
		
		body.appendChild(emb);
		return;
	}
}