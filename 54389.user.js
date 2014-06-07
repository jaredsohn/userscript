// ==UserScript==
// @name           Includes : Php
// @namespace      http://gm.wesley.eti.br/includes
// @description    Php Functions
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.0.2.0 BETA
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

function array_slice(arr, offs, len, preserve_keys)
{
	var result = [];
	var at = arr.length;
	if (offs < 0)
		offs += at;
	if (typeof len == "undefined")
		len = at;
	len += offs;

	for ( var ai = 0 ; ai < at ; ++ai )
	if (ai >= offs && ai <= len)
	if (preserve_keys)
		result[ai] = arr[ai];
	else
		result.push(arr[ai]);

	return result;
}
function in_array(needle, haystack, strict)
{
	for ( var key in haystack)
		if (strict && haystack[key] === needle || !strict && haystack[key] == needle)
			return true;
	return false;
}
