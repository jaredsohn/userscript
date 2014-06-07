// ==UserScript==
// @name           Greasemungo Highlight Friends
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Hightlight friends at the same city (2008-09-12)
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp?action=Relations&*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Highlight Friends
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

const FRIEND_ROWS_XPATH = '/html/body/table[3]/tbody/tr/td[1]/div[2]/table[1]/tbody/tr/td[1]/a/b/../../../.';
const HIGHLIGHT_COLOR = '#ffff7f !important';

////////////////////////////////////////////////////////////////////////////////

function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var friendRows = xpathNodes(FRIEND_ROWS_XPATH);

for (var i = friendRows.snapshotLength - 1; i >= 0; i--) {
	friendRows.snapshotItem(i).style.backgroundColor = HIGHLIGHT_COLOR;
}

// EOF