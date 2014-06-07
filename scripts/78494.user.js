// ==UserScript==
// @name           OGame Redesign: Set Target to Planet
// @namespace      Vesselin
// @version        1.01
// @date           2010-06-23
// @description    Sets the target of the fleet to a planet, if no mission is selected
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=fleet1') == -1)
		return;
	var mission = document.getElementsByName ("mission");
	if ((mission != null) && (mission.length > 0) && (mission [0].value == "0"))
	{
		var target = document.getElementsByName ("type");
		if ((target != null) && (target.length > 0) && (target [0].value == "3"))
			target [0].value = "1";
	}
}
)();