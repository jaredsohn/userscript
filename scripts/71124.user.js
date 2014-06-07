// ==UserScript==
// @name           Userscripts : code2pre
// @namespace      http://gm.wesley.eti.br/userscripts
// @description    Converts multi-line <code> blocks into <pre> blocks
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2010+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.2
// @language       en
// @include        http://userscripts.org/topics/*
// @include        http://userscripts.org/home/comments*
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

for each ( var code in xpath(".//code[not(ancestor::pre or ancestor::code) and (descendant::br or contains(descendant::text(), '\n'))]") )
{
	var pre = document.createElement("pre");
	pre.innerHTML = code.innerHTML.replace(/(?:\r?\n(?=<br(?: ?\/)?>)|^\s+|\s+$)/gi, "");
	code.parentNode.replaceChild(pre, code);
}