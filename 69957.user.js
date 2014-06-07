// ==UserScript==
// @name           OGame Redesign: Disable Espionage if Colonization is Available
// @namespace      Vesselin
// @version        1.01
// @date           2010-02-26
// @description    Disables the Espionage button on the fleet sending page if Colonization is available
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=fleet3') == -1)
		return;
	if (document.getElementById ("button7").className == "on")
	{
		document.getElementById ("button6").className = "off";
		document.getElementById ("missionButton6").setAttribute ("onclick", "return false;");
		var myEvent = document.createEvent ("MouseEvents");
		myEvent.initMouseEvent ("click", true, true, window,  0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.getElementById ("missionButton7").dispatchEvent (myEvent);
	}
}
)();
