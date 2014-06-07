// ==UserScript==
// @name           OGame Redesign: Coordinates Links Fix
// @description    Fix the coordinates links
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.03
// @date           2012-01-19
// @include        http://*.ogame.*/game/index.php?page=movement*
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function ()
{
	var url = document.location.href;
	var theAs, thisA, theHref, i;
	if ((url.indexOf ("/game/index.php?page=movement")    >= 0) ||
	    (url.indexOf ("/game/index.php?page=showmessage") >= 0) ||
	    (url.indexOf ("/game/index.php?page=search")      >= 0))
	{
		theAs = document.getElementsByTagName ("a");
		for (i in theAs)
		{
			thisA = theAs [i];
			theHref = thisA.href;
			if (! theHref)
				continue;
			if ((theHref.indexOf ("galaxy=")   >= 0) &&
			    (theHref.indexOf ("system=")   >= 0) &&
			    (theHref.indexOf ("position=") <  0))
				thisA.href += "&position=" + thisA.textContent.split (/[\[:\]]/) [3];
			else if (theHref.indexOf ("showGalaxy") >= 0)
			{
				var coords = theHref.split (/\D+/);
				thisA.href = url.split ("?") [0] + "?page=galaxy&galaxy=" + coords [1] + "&system=" + coords [2] + "&position=" + coords [3];
			}
		}
	}
}
) ();
