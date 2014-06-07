// ==UserScript==
// @name           Greasemungo Show Login Server
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Shows the login server name on the entry page (2008-04-24)
// @include        http://www*.popmundo.com/common/entry.asp*
// @include        http://www*.popmundo.com/common/Entry.asp*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Show Login Server
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

var loginForm = document.getElementsByName("GameLogin")[0];

if (loginForm) {
	var a = document.createElement("a");
	a.href = loginForm.action;
	
	if (a.hostname) {
		var langSelect = document.getElementsByName("LanguageID")[0];

		if (langSelect) {	
			var div = document.createElement("div");
			div.style.color = "#777777";
			div.appendChild(document.createTextNode(a.hostname));
			
			langSelect.parentNode.appendChild(div);
		}
	}
}