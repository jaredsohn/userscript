// ==UserScript==
// @name           Add Ebaums Random Button
// @namespace      http://cbeaudin.com/
// @include        http://www.ebaumsworld.com/*
// @version        2011.03.17
// @description    Adds an easily accessible random video button to the sidebar in all video sections (right sidebar at the top)
// ==/UserScript==

/*
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
*/

window.setTimeout(ew_insert_rnd_bttn,10);

function ew_insert_rnd_bttn()
{
	var code = "<input type='button' name='Random' value='Random Video' style='width:100%;text-align:center;padding:4px;margin-bottom:5px' onClick=\"window.location.href='http://ebaumsworld.com/video/random'\" />"
	var orig = document.getElementById("rightColumn").innerHTML;
	document.getElementById("rightColumn").innerHTML = code + orig;
}

