// ==UserScript==
// @name	OGame Redesign: Short Header
// @version	2.01
// @namespace	Gollaoum
// @copyright	2009 Gollaoum
// @author	Vesselin Bontchev
// @date	2012-09-22
// @description	Minimize the header whenever possible
// @include	http://*.ogame.*/game/index.php?page=fleet1*
// @include	http://*.ogame.*/game/index.php?page=fleet2*
// @include	http://*.ogame.*/game/index.php?page=fleet3*
// @include	http://*.ogame.*/game/index.php?page=movement*
// @include	http://*.ogame.*/game/index.php?page=messages*
// @include	http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((document.location.href.indexOf ("/game/index.php?page=fleet")    < 0) &&
	    (document.location.href.indexOf ("/game/index.php?page=movement") < 0) &&
	    (document.location.href.indexOf ("/game/index.php?page=messages") < 0) &&
	    (document.location.href.indexOf ("/game/index.php?page=alliance") < 0))
		return;
	var myFunc = (function ()
	{
		if ($ ("a.toggleHeader").length && ! $ (".c-left").hasClass ("shortCorner"))
		{
			$ ("#planet").addClass  ("shortHeader");
			$ (".c-left").addClass  ("shortCorner");
			$ (".c-right").addClass ("shortCorner");
			$.cookie (cookieName, 0, { expires: 365 });
		}
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
}) ();
