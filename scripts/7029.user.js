// ==UserScript==
// @name		Last.fm - Percentage (2 decimal places)
// @namespace	tag:http://arvixx.blogspot.com,2005-08-14:Last.fm-Percentage.
// @description	Display percentage statistics on user profile
// @include	http://www.last.fm/user/*
// @include	http://last.fm/user/*
// ==/UserScript==

//This is a complete rewrite of http://www.userscripts.org/scripts/show/693  in order to make it work with
//Last.fm
//- arvid.jakobsson@gmail.com

//Modified to display more detail and lower threshold
//- M Lenzen

//2006-12-29 Modified to work with the latest last.fm changes
//- m.lenzen@gmail.com

//2007-01-08 Added one decimal place

//Changelog:
//2005-08-14 * 1.0 - Initial version
//2005-12-16 _ml - modified version
//2006-12-29
//2007-01-08 _jellevc - 2 decimals

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
 */

(function () {
	function xpath(query) {
		return document.evaluate(query, document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	var tracksplayed = document.getElementById("aboutMe").innerHTML.match(/<\/strong>\W+([0-9,]+)<\/span>/)[1].replace(/,/, "");
	if (!tracksplayed)
		return;

	var bars = xpath("//TD[@class='quantifier']/DIV/SPAN");

	for (var i = 0; i < bars.snapshotLength; i++) {
		var bar = bars.snapshotItem(i)
		var played = bar.innerHTML.replace(/,/, "");
		var percentage = Math.round((played / tracksplayed) * 10000) / 100;
		if (percentage >= .01) {
			bar.innerHTML = "<nobr>" + played + " (" + percentage + "%)</nobr>";
		}
		else {
			bar.innerHTML = "<nobr>" + played + "</nobr>";
		}
	}

})();





