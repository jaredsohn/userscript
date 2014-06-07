// ==UserScript==
// @name           Thien Version: Dice-A-Roo(fast)
// @description    Plays Dice-a-Roo (iced very easily...be careful)
// @include        http://www.neopets.com/games/dicearoo.phtml
// @include        http://www.neopets.com/games/play_dicearoo.phtml
// @require        http://www.wesley.eti.br/includes/js/php.js
// @require        http://www.wesley.eti.br/includes/js/php2js.js
// @require        http://gm.wesley.eti.br/gm_default.js
// @author         Thienghiem
// @email          Thienghiem@gmail.com
// @version        1A
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
	'version':'1.0.3'
});

(function(){	// script scope

	var user = {
		interval:GM_getValue('interval',	'1').split('-').array_map(parseInt,array_fill(0,2,10)),
		repeat:GM_getValue('repeat',		-1),
		silver_dice:GM_getValue('silver_dice',	false)
	}

	GM_registerMenuCommand('[Neopets : Dice-A-Roo] Stop when silver dice is reached.', function()
	{
		var result = !GM_getValue('silver_dice', false);
		GM_setValue('silver_dice', result);
		alert( result ? 'Activated!' : 'Deactivated!' );
	});

	var script = {
		current:GM_getValue('current',0),
		stop_alerting:GM_getValue('stop_alerting',	false)
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

		var is_silver = document.evaluate("//td[@class='content']//div/center/img[1][contains(@src,'/games/dice/silver')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue != null;
		if (is_silver && user.silver_dice)
		{
			if (!script.stop_alerting)
			{
				GM_setValue('stop_alerting', true);
				alert("[Neopets : Dice-A-Roo]\nReached the silver dice!");
			}
		}
		else
		{
			if (script.stop_alerting)
				GM_setValue('stop_alerting', false);
			setTimeout(function(){dform.submit();},randomValue(user.interval));
		}
	}
})();