// ==UserScript==
// @name           Neopets : The Snowager
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Plays The Snowager
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0.0
// @language       en
// @include        http://www.neopets.com/winter/snowager.phtml
// @include        http://www.neopets.com/winter/snowager2.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/35213.meta.js
// @resource       i18n http://pastebin.com/download.php?i=1F0jQb5L
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @cfu:version    version
// ==/UserScript==

/**************************************************************************

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

//GM_setValue("interval", "[1000, 1000]");

(function() {	// script scope
	var interval = JSON.parse(GM_getValue("interval", "[1000, 1000]")),
	snowager = xpath(".//a[contains(@href, 'snowager2.phtml')]")[0];

	if (snowager) {
		setTimeout(function () {
			location.replace(snowager.href);
		}, Math.floor(interval[0] + interval[1] * Math.random()));
	}
})();