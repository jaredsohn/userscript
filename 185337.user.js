// Reveal the Patriarchy
// version 1.0
// 2013-12-03
// Copyright 2013, Chris Wagar
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details:
// <http://www.gnu.org/licenses/gpl.txt>
//
// Revision history:
// 1.0  2013-12-03 initial version, based on:
//      http://userscripts.org/scripts/show/5625
//
// ==UserScript==
// @name          Reveal the Patriarchy
// @namespace     Reveal Da Patriarchy la-li-lu-le-lo
// @description   Replace all mentions of the Patriarchy with La-Li-Lu-Le-Lo
// @include       *
// @grant         none
// ==/UserScript==
//
// --------------------------------------------------------------------

var replacements, regex, key, textnodes, node, s;

replacements = {
	" patriarchy([ ,.?!])": " la-li-lu-le-lo$1",
    " Patriarchy([ ,.?!])": " La-Li-Lu-Le-Lo$1",
    " PATRIARCHY([ ,.?!])": " LA-LI-LU-LE-LO$1"
};

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
	
	node = textnodes.snapshotItem(i);
	s = node.data;
	
	for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	}

	node.data = s;

} // for