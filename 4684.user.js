/*
Infojobs relaunchView replacer

Original Copyright (C) 2006, Bruno Orcha

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details.

You should have received a copy of the GNU General Public License along with
this program; if not, write to the Free Software Foundation, Inc., 59 Temple
Place, Suite 330, Boston, MA 02111-1307 USA

*/

// ==UserScript==
// @name		Infojobs relaunchView replacer
// @namespace	http://gimco.es/greasemonkey/infojobs
// @description	Change relaunchView for links
// @include		http://www.infojobs.net/*
// ==/UserScript==

(function() {

	var InfojobsReplacer = {
		replaceRelaunch: function() {
			// Check the current URL. If we're at www.infojobs.net, replace all relaunchView!
			if (/^http:\/\/(www\.)?infojobs\.net\//.exec(window.location.href)) {
				// Turn the JavaScript relaunchView links into proper links.
				var as = window.document.getElementsByTagName('a');
				for (var i = as.length - 1; i >= 0; i--) {
					var link = as[i].href;
					if (link) {
						// Extract the item number
						var js = link.match(/^javascript:relaunchView\('item_form_codigo','(\d+?)'\)$/);
						// Change the href link! that's all!
						if (js) as[i].href = 'ver_oferta.cfm?of_codigo=' + js[1];
					}
				}
			}
		}
	}
	InfojobsReplacer.replaceRelaunch();
})();