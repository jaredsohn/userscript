// ==UserScript==
// @name           Greasemungo Forum Message Highlighter
// @description    Popmundo: Highlight the forum messages you have sent and the replies you have got. (2008-04-24)
// @namespace      kenmooda@gmail.com
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp*
// @include        http://www*.popmundo.com/Common/cn.asp?action=view&*
// @include        http://www*.popmundo.com/Common/cn.asp?a=v&*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Forum Message Highlighter
//    Copyright (C) 2007, 2008  Tommi Rautava
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

var STYLE_TEMPLATE = 'div.messageHeader a[href="characterdetails.asp?action=view&CharacterID=<CharacterID>"] { font-weight: bold; color: red; }';

var CHARACTER_LINK_XPATH = "/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr[2]/td[1]/a[2]";

var CHARACTER_ID_KEY = "CharacterID";

////////////////////////////////////////////////////////////////////////////////

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if (document.location.pathname == "/Common/CharacterDetails.asp") {
	var charLink = xpathNode(CHARACTER_LINK_XPATH);
	
	var res = charLink.search.match(/CharacterID=(\d+)/i);
	
	if (res) {
		var charId = parseInt(res[1]);
		GM_setValue(CHARACTER_ID_KEY, charId);
	}
	else {
		GM_log("Could not parse character ID: "+ charLink.href);
	}
}
else {
	var charId = GM_getValue(CHARACTER_ID_KEY, 0);
	
	if (charId) {
		addGlobalStyle(STYLE_TEMPLATE.replace('<CharacterID>', charId));
	}
}
