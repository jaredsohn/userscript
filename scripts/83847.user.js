// ==UserScript==
// @name	OGame Redesign: Merchant Warning
// @description	Shows a warning if you're about to waste 2.500 DM for a Merchant
// @namespace	Vesselin
// @version	1.04
// @date        2012-10-11
// @author      Vesselin Bontchev
// @include	http://*.ogame.*/game/index.php?page=traderOverview*
// ==/UserScript==

(function ()
{
	if (document.location.href.indexOf ("/game/index.php?page=traderOverview") < 0)
		return;
	var $;
	try
	{
		$ = unsafeWindow.$;
	}
	catch (e)
	{
		$ = window.$;
	}
	var onClick, element, warningText;
	for (var i = 1; i <= 3; i++)
	{
		element = $ ("#imageRes_" + i);
		if (element.length <= 0)
			break;
		onClick = element.attr ("onclick");
		if (onClick === undefined)
			break;
		warningText = $ (".costs").text ().trim () + "!";
		element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
	}
	$ ("#inhalt").ajaxComplete (function (e, xhr, settings)
	{
		if (xhr.status != 200)
			return;
		warningText = $ (".costs").text ().trim () + "!";
		if (settings.url.indexOf ("page=traderlayer") >= 0)
		{
			element = $ ("#merchanttable td.tradingRate a.tipsTitle");
			if (element.length)
			{
				onClick = element.attr ("onclick");
				if (onClick !== undefined)
				{
					element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
					element = $ ("#merchanttable td.newRate input.buttonTraderNewRate");
					onClick = element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
				}
			}
			element = $ ("a.buttonTraderNewRate");
			if (element.length)
			{
				onClick = element.attr ("onclick");
				if (onClick !== undefined)
					element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
			}
		}
		else if (settings.url.indexOf ("page=traderOverview") >= 0)
		{
			for (var i = 1; i <= 3; i++)
			{
				element = $ ("#imageRes_" + i);
				if (element.length <= 0)
					break;
				onClick = element.attr ("onclick");
				if (onClick === undefined)
					break;
				element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
			}
		}
	});
}) ();
