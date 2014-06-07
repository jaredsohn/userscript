// ==UserScript==
// @name           Neopets : Dice-A-Roo
// @namespace      http://neopets-cheats.us
// @description    Plays Dice-a-Roo until your pet get tired.
// @include        http://www.neopets.com/games/dicearoo.phtml
// @include        http://www.neopets.com/games/play_dicearoo.phtml
// @author         Neopets-Cheats.us
// @email          contact@neopets-cheats.us
// @version        1.0.0
// @copyright      Neopets-Cheats.us
// @license        GNU GPL
// @homepage       http://neopets-cheats.us
// ==/UserScript==

(function(){	// script scope

	var user = {
		interval:GM_getValue('interval',	'1000-2000').split('-').array_map(parseInt,array_fill(0,2,10)),
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