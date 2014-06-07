// ==UserScript==
// @name           OGame Redesign: Spy via the Fleet Dispatch Page
// @description    Modifies the "Espionage" link in the pop-up menu for each planet on the Galaxy page, so that the espionage is sent from the Fleet Dispatch page.
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.03
// @date           2012-01-10
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

(function ()
{
	var url = document.location.href;
	if (url.indexOf ("/game/index.php?page=galaxy") >= 0)
	{
		var $ = ((typeof unsafeWindow) != "undefined") ? unsafeWindow.$ : window.$;
		$ ("#galaxyContent").ajaxSuccess (function (e, xhr, settings)
		{
			if (document.getElementById ("galaxyContent") == null)
				return;
			var lis = document.querySelectorAll ("ul.ListLinks>li");
			for (var i = 0; i < lis.length; i++)
			{
				var theLi = lis [i];
				var myAs = theLi.getElementsByTagName ("a");
				for (var j = 0; j < myAs.length; j++)
				{
					var theA = myAs [j];
					var attr = theA.getAttribute ("onclick");
					if ((attr != null) && (attr.indexOf ("sendShips" >= 0)))
					{
						var session = url.match (/\&session=([a-f0-9]{1,12})/i);
						if (session && (session.length > 1))
							session = "&session=" + session [1];
						else
							session = "";
						var params = attr.split (/[\(,\)]+/);
						if (params [1] != "6")
							continue;
						var newItem = document.createElement ("li");
						var newA = document.createElement ("a");
						var newText = theA.textContent;
						newA.href	= url.split (/\?/) [0] + "?page=fleet1" + session +
								"&galaxy="   + params [2] +	// Galaxy
								"&system="   + params [3] +	// System
								"&position=" + params [4] +	// Position
								"&type="     + params [5] +	// Target type
								"&mission="  + params [1] +	// Mission type ("6")
								"&probes="   + params [6];	// Number of probes
						var buttonLinks = document.querySelectorAll ("a.menubutton");
						for (var k = 0; k < buttonLinks.length; k++)
							if (buttonLinks [k].href.indexOf ("fleet1") >= 0)
							{
								newText += " (" + buttonLinks [k].childNodes [1].textContent + ")";
								break;
							}
						newA.appendChild (document.createTextNode (newText));
						newItem.appendChild (newA);
						theLi.parentNode.insertBefore (newItem, theLi.nextSibling);
					}
				}
			}
		}
	}
	else if (url.indexOf ("/game/index.php?page=fleet1") >= 0)
	{
		if (url.indexOf ("&probes=") >= 0)
		{
			var numProbes = url.match (/&probes=(\d+)/i) [1];
			var button = document.getElementById ("button210");
			if (button == null)
				return;
			mySpans = button.getElementsByTagName ("span");
			var probesAvailable = parseInt (mySpans [1].childNodes [1].textContent.replace (/\D+/, ""));
			if (numProbes > probesAvailable)
				numProbes = probesAvailable;
			document.getElementById ("ship_210").value = numProbes;
		}
	}
}
) ();
