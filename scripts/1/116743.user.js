// ==UserScript==
// @name           Neopets : Moltara Gears + Worms
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Refreshes Moltara main page until items be found
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.1
// @language       en
// @include        http://www.neopets.com/magma/
// @include        http://www.neopets.com/magma/index.phtml
// @include        http://www.neopets.com/magma/caves.phtml
// @include        http://www.neopets.com/objects.phtml?type=inventory
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

var moltara = xpath('//script[contains(text(), "/maps/magma/moltara")]')[0];

if (moltara)
if (/^swf\.addVariable\([''""](?:worm|material_url)/im.test(moltara.textContent.replace(/^\s+/gm, "")))
alert("Item found!");
else
setTimeout(function(){location.reload();}, 900 + Math.floor(300 * Math.random()));

/*
swf.addVariable('material_id', '5');
swf.addVariable('material_url', '/magma/gears.phtml?hash=...');
swf.addVariable('worm5', '%2Fmagma%2Fgears.phtml%3Fhash%3D...');
*/