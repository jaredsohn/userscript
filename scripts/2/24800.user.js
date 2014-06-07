// ==UserScript==
// @name           Greasemungo Quick Steal
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Steal items without confirmation (2008-04-24)
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp?action=ViewItems&*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Quick Steal
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

for (var i=nodes.snapshotLength-1; i>=0; i--) {
	var link1 = nodes.snapshotItem(i);
	link1.search = link1.search.replace(/action\=StealItem\&/i, "action=StealItemYes&");
}


function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// EOF