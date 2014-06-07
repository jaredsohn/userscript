// ==UserScript==
// @name           Includes : FileIni
// @namespace      http://gm.wesley.eti.br/includes
// @description    FileIni Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2010+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.0
// @language       en
// @include        nowhere
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

FileIni = function(){};
FileIni.read = function(str, section, item)
{
	var x = str.replace(/\r/g, "");

	for (var ai = 0,s = 0,at = 0;(ai = x.toLowerCase().indexOf("\n" + item + "=", at)) > -1 && (s = x.toLowerCase().indexOf("\n[" + section + "]\n", at)) > -1;at = ai)
	if (s > ai)
	ai = s;
	else
	{
		ai += 2 + item.length;

		var p = x.indexOf("\n", ai),
		pp = x.indexOf("\n[", 2 + s);

		if (s > -1 && (pp == -1 || pp > ai))
		if (p > -1)
		return x.substring(ai, p);
		else
		return x.substr(ai);
	}

	return null;
};