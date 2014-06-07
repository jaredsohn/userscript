// ==UserScript==
// @name         NewScientist - Cleaner Layout
// @version      0.1
// @date         2006-03-09
// @description  Removes the right sidebar and adverts
// @author       Simon Arlott
// @namespace    http://simon.arlott.org/gm/
// @include      http*://newscientist.com/*
// @include      http*://*.newscientist.com/*
// @include      http*://newscientistspace.com/article/*
// @include      http*://*.newscientistspace.com/article/*
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
	var logged_in = 0;

	var forms = document.getElementsByTagName("form");
	for (var i = 0; i < forms.length ; i++) {
		if (forms[i].action.match(/^https?:\/\/[^\/]+\/logout/)) {
			logged_in = 1;
		}
	}

	if (logged_in) {
		// make articles wider
		var head = document.getElementsByTagName("head")[0];
		var style = document.createElement("style");
		style.setAttribute("type", 'text/css');
		style.innerHTML = '#artBody p, #artBody h5, .authaff { max-width: none; } #nest1 { width: 830px; } #nest2 { width: 995px; } #artbx { background: #fff; } #contentsurround, #contenttable { width: 992px; } #homecol1, #headercontain, #copycol { width: auto; }';
		head.appendChild(style);


		// move login boxes to the left column
		var lhcol = document.getElementById("lhcol");
		var skylogin = document.getElementById("skylogin");
		if (lhcol && skylogin) {
			lhcol.insertBefore(skylogin, lhcol.lastChild);

			var skysurround = document.getElementById("skysurround");
			if (skysurround) skysurround.setAttribute("style", "display: none;");
		}

		var pglhcol = document.getElementById("pglhcol");
		var rhlogin = document.getElementById("rhlogin");
		var lhnscom = document.getElementById("lhnscom");
		if (pglhcol && rhlogin && lhnscom) {
			rhlogin.setAttribute("class", "lhlinksbx bx");
			pglhcol.insertBefore(rhlogin, lhnscom);

			var pgrhcol = document.getElementById("pgrhcol");
			if (pgrhcol) pgrhcol.setAttribute("style", "display: none;");
		}


		// remove ads
		var mpuholder = document.getElementById("mpuholder");
		if (mpuholder) mpuholder.setAttribute("style", "display: none;");

		var lhjobs = document.getElementById("lhjobs");
		if (lhjobs) lhjobs.setAttribute("style", "display: none;");

		var boxad = document.getElementById("boxad");
		if (boxad) boxad.parentNode.setAttribute("style", "display: none;");

		var rhsky = document.getElementById("rhsky");
		if (rhsky) rhsky.setAttribute("style", "display: none;");
	}
}());
