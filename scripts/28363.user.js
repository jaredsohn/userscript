// ==UserScript==
// @name           Neopets : Mysterious Symol Hole
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Plays Mysterious Symol Hole
// @include        http://www.neopets.com/medieval/symolhole.phtml
// @require        http://www.wesley.eti.br/includes/js/php.js
// @require        http://www.wesley.eti.br/includes/js/php2js.js
// @require        http://gm.wesley.eti.br/gm_default.js
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @version        1.0.1
// @copyright      w35l3y 2008
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
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

checkForUpdate({
	'file':'http://userscripts.org/scripts/source/28363.user.js',
	'name':'Neopets : Mysterious Symol Hole',
	'namespace':'http://gm.wesley.eti.br/neopets',
	'version':'1.0.1'
});

(function(){	// script scope
	var user = {
		interval:GM_getValue('interval',	'1000-2000').split('-').array_map(parseInt,array_fill(0,2,10))
	};

	var field = document.evaluate("//form[contains(@action,'process_symolhole.phtml')]/select[@name = 'goin']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	field.selectedIndex = Math.floor(100*Math.random()*field.length % (field.length-1));

	setTimeout(function(){field.form.submit();},randomValue(user.interval));
})();