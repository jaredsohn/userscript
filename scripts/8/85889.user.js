// ==UserScript==
// @name           OGame Redesign: Point Board Link Really to the Forum
// @description    Makes the "Board" link in the footer menu point really to the forum instead of to the useless portal.
// @namespace      Vesselin
// @version        1.00
// @date           2010-08-18
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=") < 0)
		return;
	var footer = document.getElementById ("siteFooter");
	if (footer == null)
		return;
	myAs = footer.getElementsByTagName ("a");
	for (var i in myAs)
	{
		var theA = myAs [i];
		if (theA.href.indexOf ("http://board.") >= 0)
		{
			theA.href += "index.php?page=Index";
			break;
		}
	}
}
) ();