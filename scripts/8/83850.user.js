// ==UserScript==
// @name           OGame Redesign: Set the Focus Correctly
// @description    Fixes som places in the game where the focus isn't set correctly.
// @namespace      Vesselin
// @version        1.04
// @date           2011-12-13
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=search*
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=networkkommunikation*
// @include        http://*.ogame.*/game/index.php?page=jumpgatelayer*
// @include        http://*.ogame.*/game/index.php?page=alliance&*tab=broadcast*
// ==/UserScript==

(function ()
{
	var theInput;
	if (document.location.href.indexOf ("/game/index.php?page=search") >= 0)
		setTimeout ("document.getElementsByName ('searchtext') [0].focus ();", 100);
	else if (document.location.href.indexOf ("page=networkkommunikation") >= 0)
		document.getElementById ("dissolveally").getElementsByTagName ("textarea") [0].focus ();
	else if (document.location.href.indexOf ("tab=broadcast") >= 0)
	{
		var $;
		try
		{
			$ = unsafeWindow.$;
		}
		catch (e)
		{
			$ = window.$;
		}
		$ ("#eins").ajaxSuccess (function (e, xhr, settings)
		{
			if (settings.url.indexOf ("page=allianceBroadcast") < 0)
				return;
			document.getElementById ("dissolveally").getElementsByTagName ("textarea") [0].focus ();
		});
	}
	else if (document.location.href.indexOf ("page=jumpgatelayer") >= 0)
	{
		setTimeout (function ()
		{
			var inputs = document.getElementsByTagName ("input");
			for (var i = 0; i < inputs.length; i++)
			{
				theInput = inputs [i];
				if ((theInput.className != "disabled") && (theInput.type != "hidden"))
				{
					theInput.focus ();
					break;
				}
			}
		}, 500);
	}
	else if (document.location.href.indexOf ("/game/index.php?page=fleet1") >= 0)
	{
		buttons = document.querySelectorAll ("a.max");
		for (var i = 0; i < buttons.length; i++)
			if (buttons [i].getAttribute ("onclick") != null)
			{
				theInput = buttons [i].parentNode.childNodes [3];
				if (theInput.value)
					continue
				theInput.focus ();
				break;
			}
	}
	else if (document.location.href.indexOf ("/game/index.php?page=galaxy") >= 0)
	{
		var focusSet = false;
		function setFocus ()
		{
			theInput = document.getElementById ("anz");
			if (theInput == null)
				focusSet = false;
			else
			{
				if (! focusSet)
				{
					theInput.focus ();
					focusSet = true;
				}
				if (theInput.getAttribute ("onkeypress") == null)
				{
					var session = document.location.href.match (/\&session=([a-f0-9]{1,12})/i);
					if (session && session.length > 1)
						session = "&session=" + session [1];
					else
						session = "";
					theInput.setAttribute ("onkeydown",
						"var keycode; " +
						"if (event) " +
							"keycode = window.event.keyCode; " +
						"else if (e) " +
							"keycode = e.which; " +
						"else return true; " +
						"if (keycode == 13) " +
						"{ " +
							"ajaxFormSubmit ('rocketForm', " +
								"'index.php?page=missileattack_execute" +
								session +
								"', launchMissiles); " +
							"return false; "+
						"} " +
						"else " +
							"return true;");
				}
			}
		}
		setInterval (setFocus, 500);
	}
}
) ();
