// ==UserScript==
// @name	OGame Redesign: Activation Warning
// @description	Shows a confirmation dialog before activating a booster
// @namespace	Vesselin
// @version	1.01
// @date        2012-08-05
// @author      Vesselin Bontchev
// @include	http://*.ogame.*/game/index.php*page=overview*
// ==/UserScript==

(function ()
{
	if (document.location.href.indexOf ("page=overview") < 0)
		return;
	var strFunc = (function ()
	{
		var paidOnly = false;
		var done = false;
		$ ("#inhalt").ajaxComplete (function (e, xhr, settings)
		{
			if (xhr.status != 200)
				return;
			if (done)
				return;
			if (settings.url.indexOf ("page=buffActivation") >= 0)
			{
				if (paidOnly && $ ("#activationButton").hasClass ("activateItem"))
					return;
				var activateItem_old = activateItem;
				activateItem = function (ref)
				{
					errorBoxDecision (LocalizationStrings ["attention"] + "!", $ ("#activationButton").text () + " " + $ ("h2.js_itemName").text () + "?", LocalizationStrings ["yes"], LocalizationStrings ["no"], function ()
					{
						activateItem_old (ref);
						closeErrorBox ();
					});
				}
				done = true;
			}
		});
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "text/javascript");
	script.text = "(" + strFunc + ") ();";
	document.body.appendChild (script);
}) ();
