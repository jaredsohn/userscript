// ==UserScript==
// @name           Includes : AjaxUpdate [BETA]
// @namespace      http://gm.wesley.eti.br
// @description    AjaxUpdate Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.1
// @language       en
// @include        nowhere
// @exclude        *
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
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

AjaxUpdate = function () {};
AjaxUpdate.init = function (obj) {
	var result = {
		error		: !!obj.error,
		document	: xpath(obj.root)[0],
		next		: function (x) {
			var tmp = {
				open	: {
					method		: "get",
					url			: "#",
					headers		: {
						"Referer"	: obj.referer || location.href,
					},
					onsuccess	: function (xhr) {
						var root = xpath(obj.root, xhr.response.xml)[0];
						if (root) {
							result.document.parentNode.replaceChild(root, result.document);
							obj.referer = xhr.response.raw.finalUrl;
						} else {
							console.log(xhr.response.text);
						}
						obj.error = !root;
						AjaxUpdate.init(obj);
					},
				},
				send	: {},
			};

			if (x instanceof HTMLAnchorElement) {
				tmp.open.url = x.href;
			} else if (!obj.result || (x = obj.result(x))) {
				tmp.open.method = x.method || "get";
				tmp.open.url = x.action || "#";
				tmp.send = x.elements || {};
			}
			
			HttpRequest.open(tmp.open).send(tmp.send);
		},
	};

	if (result.document) {
		if (obj.triggers) {
			for each (var trigger in xpath(obj.triggers, result.document)) {
				trigger.addEventListener(trigger instanceof HTMLFormElement?"submit":"click", function (e) {
					e.preventDefault();
					e.stopPropagation();

					result.next(this);
				}, false);
			}
		}
		
		obj.onsuccess(result);
	}
};