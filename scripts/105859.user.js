// ==UserScript==
// @name           Userscripts : Improved Search bars
// @namespace      http://gm.wesley.eti.br/userscripts
// @description    Improves /users/* search bars
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0.0
// @language       en
// @include        http://userscripts.org/users/*/groups*
// @include        http://userscripts.org/users/*/scripts*
// @include        http://userscripts.org/users/*/guides*
// @include        http://userscripts.org/users/*/posts*
// @include        http://userscripts.org/users/*/comments*
// @include        http://userscripts.org/users/*/reviews*
// @include        http://userscripts.org/users/*/favorites*
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/105859.meta.js
// @resource       i18n http://pastebin.com/download.php?i=N5Bnm8z6
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @history        2.0.0.0 Updated @require#87942
// @history        1.0.0.1 Some little bug fixes
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
	if (/\d+\/(\w+)/.test(location.pathname)) {
		var path = RegExp.$1,
		search = xpath("id('section_search')")[0];

		if (!search) {
			search = document.createElement("div");
			search.setAttribute("id", "section_search");
			search.innerHTML = '<form method="get" action="/scripts/search"><input type="text" title="Search" placeholder="Search scripts" name="q" class="input" /><input type="submit" value="" name="submit" class="go" /></form>';

			xpath("id('section')/div[@class~='container']")[0].appendChild(search);
		}

		var q = xpath(".//input[@name='q'][1]", search)[0];

		switch (path) {
			case "comments":
			case "groups":
			case "guides":
			case "reviews":
				q.setAttribute("placeholder", "Search " + path);
				q.form.setAttribute("action", "/" + path);
				break;
			case "posts":
				q.setAttribute("placeholder", "Search forums");
				q.form.setAttribute("action", "/posts/search");
				break;
			default:
				q.setAttribute("placeholder", "Search scripts");
				q.form.setAttribute("action", "/scripts/search");
				break;
		}
	}
}());