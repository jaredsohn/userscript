// ==UserScript==
// @name           OGame Redesign: Short Combat Report Link Fix
// @description    Fixes the link to the detailed combat report, so that multiple such can be opened in tabs
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.00
// @date           2012-06-30
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=movement") < 0)
		return;
	var theA = document.querySelector ("#shortreport td.textCenter a");
	if (theA == null)
		return;
	theA.onclick.exec (/'([^']+)'/);
	if (RegExp.$1 == "")
		return;
	theA.href = RegExp.$1;
	theA.target = "_blank";
}) ();
