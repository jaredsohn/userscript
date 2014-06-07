// ==UserScript==
// @name           Greasemungo Hide Skill Progress Bars
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Hides the progress bars on the character's skill page. (2008-04-24)
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp?action=MySkills*
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp?action=SelectSkill
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Hide Skill Progress Bars
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

var IMG_XPATH = "//img[contains(@src, '/progressbar/')]";

function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var nodes = xpathNodes(IMG_XPATH);

for (var i = nodes.snapshotLength - 1; i >= 0; i--) {
	var node = nodes.snapshotItem(i);
	
	node.style.display = "none";
}


// The rest is needed only if Popomungo is installed.
nodes = document.getElementsByTagName("span");

for (var i = nodes.length - 1; i >= 0; i--) {
	var node = nodes.item(i);

	if (node.className == "popomungo_bar_overlay") {
		node.style.display = "none";
	}
}

// EOF