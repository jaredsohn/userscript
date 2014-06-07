// ==UserScript==
// @name           Neopets : Kitchen Quest : Time countdown
// @namespace      http://gm.wesley.eti.br
// @description    Dynamically shows the time till quest finishes
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.0
// @language       en
// @include        http://www.neopets.com/island/kitchen.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @require        http://userscripts.org/scripts/source/63808.user.js
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

(function () {	// script scope
	const MIN_TO_MSEC = 60000,
	HR_TO_MSEC = 3600000;

	var dl = xpath(".//td[@class = 'content']//tr[2]/td[2]/b/b");

	if (dl.length)
	(function recursive (obj) {
		var c = new Date(),
		d = obj.deadline - c.valueOf() + MIN_TO_MSEC,
		h = Math.floor(d / HR_TO_MSEC),
		m = Math.floor(d % HR_TO_MSEC / MIN_TO_MSEC);

		if (d > 0) {
			if (obj.dom[0].textContent == h && obj.dom[1].textContent < m) {
				console.log(obj.dom[1].textContent, m, d % MIN_TO_MSEC, c.getSeconds(), obj.dom[0].textContent, h);
				obj.deadline -= 1000 * c.getSeconds();
			} else {
				obj.dom[1].textContent = m;
			}

			obj.dom[0].textContent = h;

			window.setTimeout(recursive, MIN_TO_MSEC, obj);
		}
	}({
		deadline : new Date().valueOf() + 1000 * (3600 * dl[0].textContent + 60 * dl[1].textContent),
		dom : dl,
	}));
}());