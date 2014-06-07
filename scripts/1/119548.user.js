// ==UserScript==
// @name           OGame Redesign: Fix the Color of the Expedition Combat Reports
// @description    Fixes the color (green for win, red for loss) that was reversed in OGame 2.3.3
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.01
// @date           2011-12-04
// @include        http://*.ogame.*/game/index.php?page=messages*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=messages") == -1)
		return;
	var oVersion = document.getElementsByName ("ogame-version");
	if ((oVersion == null) || (oVersion == "undefined") || (oVersion.length < 1) || (oVersion [0].content != "2.3.3"))
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
	$ ("#messageContent").ajaxSuccess (function (e, xhr, settings)
	{
		var mySpans = document.querySelectorAll (".combatreport_ididattack_iwon,.combatreport_ididattack_ilost");
		for (var i = 0; i < mySpans.length; i++)
		{
			var theSpan = mySpans [i];
			if (theSpan.textContent.indexOf (":16]") >= 0)
				theSpan.className = (theSpan.className == "combatreport_ididattack_iwon") ? "combatreport_ididattack_ilost" : "combatreport_ididattack_iwon";
		}
	});
}
) ();
