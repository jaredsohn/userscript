// ==UserScript==
// @name           OGame Redesign: Current Planet Name in Page Titles
// @description    Adds the current planet name to the titles of the Messages and some other pages
// @namespace      Vesselin
// @version        1.06
// @date           2012-06-04
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=traderOverview*
// @include        http://*.ogame.*/game/index.php?page=messages*
// @include        http://*.ogame.*/game/index.php?page=alliance*
// @include        http://*.ogame.*/game/index.php?page=network*
// @include        http://*.ogame.*/game/index.php?page=premium*
// @include        http://*.ogame.*/game/index.php?page=shop*
// ==/UserScript==

(function ()
{
	var url = document.location.href;
	var metaTag = document.getElementsByName ("ogame-planet-name");
	var planetName = (metaTag && metaTag.length > 0) ? metaTag [0].content : document.getElementById ("selectedPlanetName").textContent;
	if ((url.indexOf ("/game/index.php?page=messages") >= 0) ||
	    (url.indexOf ("/game/index.php?page=alliance") >= 0) ||
	    (url.indexOf ("/game/index.php?page=network")  >= 0) ||
	    (url.indexOf ("/game/index.php?page=premium")  >= 0) ||
	    (url.indexOf ("/game/index.php?page=shop")     >= 0))
		document.getElementById ("planet").getElementsByTagName ("h2") [0].innerHTML += ' - ' + document.getElementById ("selectedPlanetName").innerHTML;
	else if (url.indexOf ("/game/index.php?page=traderOverview") >= 0)
	{
		var unsafe;
		var $;
		try
		{
			unsafe = unsafeWindow;
		}
		catch (e)
		{
			unsafe = window;
		}
		$ = unsafe.$;
		var myFunc = function ()
		{
			var myHeader = $ ("#header_text h2").text ();
			if (myHeader.indexOf (' - ' + planetName) < 0)
				$ ("#header_text h2").text (myHeader + ' - ' + planetName);
		}
		$ (document).ready (function ()
		{
			if (unsafe.traderObj.traderId && (unsafe.traderObj.traderId.length > 0))
				myFunc ();
			$ ("#planet .js_trader").bind ("click.selectTrader", function ()
			{
				if (unsafe.traderObj.traderId && (unsafe.traderObj.traderId.length > 0))
					myFunc ();
			});
		});
		$ ("#inhalt").ajaxSuccess (function (e, xhr, settings)
		{
			if (settings.url.indexOf ("page=traderOverview") < 0)
				return;
			myFunc ();
		});
	}
}
)();
