// ==UserScript==
// @name         SourceForge - Cleaner Layout
// @version      0.3
// @date         2006-08-03
// @description  Removes the right sidebar and adverts
// @author       Simon Arlott
// @author       Archimedes Trajano
// @namespace    http://simon.arlott.org/gm/
// @include      http://sourceforge.net/*
// @include      https://sourceforge.net/*
// ==/UserScript==
/*
	Copyright © 2006  Simon Arlott

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

(function (){
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.innerHTML = '#ostgservices, div.four, div.five, div#head, div#footer, #fadbtmp, .sponsor { display: none !important; } .onewide, .onewidetop { margin: 0; }';
	head.appendChild(style);

	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length ; i++) {
		if (divs[i].id.match(/^ad[0-9]+$/)) {
			divs[i].style.display = "none";
		} else if (divs[i].id.match(/^fad[0-9]+p$/)) {
			divs[i].style.display = "none";
		}
	}
}());

