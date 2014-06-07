// ==UserScript==
// @name           Neopets : Training School : Time countdown
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Dynamically shows the time till course finishes
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.1.0
// @language       en
// @include        http://www.neopets.com/island/training.phtml?type=status
// @include        http://www.neopets.com/pirates/academy.phtml?type=status
// @include        http://www.neopets.com/island/fight_training.phtml?type=status
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85450.user.js
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

(function () {
	var list = xpath(".//td[@class = 'content']//td[not(form) and b[contains(text(), 'minute')]]/b/text()");

	for (var ai in list) {
		var o = list[ai];

		window.setInterval(function (obj) {
			obj.node.textContent = obj.timer.toString("{0?(- }{1} hr{1?s}, {2} minute{2?s}, {3} second{3?s}{0?)}");
			
			if (obj.timer.current(true) < 0 && !obj.complete) {
				obj.complete = true;

				if (obj.pet) {
					var f = obj.node.parentNode.parentNode.appendChild(document.createElement("form"));
					f.setAttribute("method", "post");
					f.setAttribute("action", "process_fight_training.phtml");
					f.innerHTML = '<input type="hidden" value="complete" name="type" /><input type="hidden" value="' + obj.pet + '" name="pet_name" /><input type="submit" value="Complete Course!" />';
				}
			}
		}, 1000, {
			complete	: false,
			node		: o,
			pet			: /\/cpn\/(.+?)\//.test(xpath("string(./ancestor::tr[1]/td[1]/img/@src)", o)) && RegExp.$1,
			timer		: Timer.convert(o.textContent.match(/\d+/g).join(":")),
//			timer		: Timer.convert("0:0:9"),
		});
	}
}());