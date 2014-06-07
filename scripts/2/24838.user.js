// ==UserScript==
// @name           Greasemungo Quick Steal Icon Link
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Adds an icon link for stealing items without confirmation (2008-04-24)
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp?action=ViewItems&*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Quick Steal Icon Link
//    Copyright (C) 2008  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

const STEAL_LINKS_XPATH = "//a[contains(@href, 'StealItem')]";

var nodes = xpathNodes(STEAL_LINKS_XPATH);
GM_log("nodes="+ nodes.snapshotLength);

for (var i=nodes.snapshotLength-1; i>=0; i--) {
	var link1 = nodes.snapshotItem(i);
	
	var img1 = document.createElement("img");
	img1.src = "/Common/graphics/Retro/Miscellaneous/weight.gif";
	img1.alt = "QUICK STEAL";

	var link2 = document.createElement("a");
	link2.href = link1.href;
	link2.search = link1.search.replace(/action\=StealItem\&/i, "action=StealItemYes&");
	link2.appendChild(img1);
	
	link1.parentNode.insertBefore(link2, link1);
}


function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// EOF