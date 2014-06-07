// ==UserScript==
// @name           Cyanide and Happiness : Ajax Navigation
// @namespace      http://gm.wesley.eti.br
// @description    Only updates the comic part of the page
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.3
// @language       en
// @include        http://explosm.net/comics/*
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// ==/UserScript==

/**************************************************************************

    Author's NOTE

    This script was made from scratch.

    Based on http://userscripts.org/scripts/show/33692 (by avindra)

***************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

(function () {	// script scope
	document.addEventListener("keydown", function (e) {
		if (/^(?:37|39)$/.test(e.keyCode)) {
			e.stopPropagation();
		}
	}, true);

	document.addEventListener("keyup", function (e) {
		var b;
		if (/^(?:37|39|70|78|82)$/.test(e.keyCode) && (b = document.getElementById("nav_" + {
				37 : "previous",
				39 : "next",
				70 : "first",
				78 : "newest",
				82 : "random",
			}[e.keyCode]))) {
			
			b.click();

			e.preventDefault();
			//e.stopPropagation();
		}
	}, false);

	xpath(".//div/div/div[4]/div[2]/table")[0].setAttribute("height", 600);

	function click (e) {
		HttpRequest.open({
			"method" : "get",
			"url" : e.target.href,
			"onsuccess" : function (xhr) {
				var o = xpath(".//div/div/div[4]/div[2]/div[2]", document)[0],
				n = xpath(".//div/div/div[4]/div[2]/div[2]", xhr.response.xml)[0],
				t = xpath("string(.//title/text())", xhr.response.xml);
				
				o.parentNode.replaceChild(n, o);

				n.setAttribute("id", "top");
				location.hash = "#top";

				document.title = t;
				window.history.pushState({}, t, e.target.href);

				recursive(n);
			}
		}).send();

		e.preventDefault();
	}

	function recursive (doc) {
		for each (var nav in xpath(".//table/tbody/tr/td[2]/nobr//a[not(contains(@href, 'archive'))]", doc)) {
			nav.setAttribute("id", "nav_" + nav.textContent.replace(/\W+/g, "").toLowerCase());

			nav.addEventListener("click", click, false);
		}
	};

	recursive(document);
}());