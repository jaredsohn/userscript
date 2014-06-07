// ==UserScript==
// @name           OGame Redesign: Player Name on 3rd Fleet Dispatch Page
// @description    Shows the name of the player to whom the target belongs on the 3rd Fleet Dispatch page
// @namespace      Vess
// @version	   1.04
// @date           2012-02-28
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=fleet3") < 0)
		return;
	var oVersion = document.getElementsByName ("ogame-version");
	if ((oVersion == null) || (oVersion == "undefined") || (oVersion.length < 1))
		return;
	var versionParts = oVersion [0].content.split (".");
	if ((versionParts.length < 3) ||
	    (versionParts [0] < "2") ||
	    ((versionParts [0] == "2") && (versionParts [1] < "3")) ||
	    ((versionParts [0] == "2") && (versionParts [1] == "3") && (versionParts [2] < "2")))
		return;
	var roundUp = document.getElementById ("roundup");
	if (roundUp == null)
		return;
	var myUL = roundUp.getElementsByTagName ("ul");
	if ((myUL == null) || (myUL.length < 1))
		return;
	myUL = myUL [0];
	var myLIs = myUL.getElementsByTagName ("li");
	if ((myLIs == null) || (myLIs.length < 2))
		return;
	var mySpans = myLIs [0].getElementsByTagName ("span");
	if ((mySpans == null) || (mySpans.length < 1))
		return;
	var playerName = mySpans [0].title;
	var place = 1;
	if (playerName == "")
	{
		if (myLIs.length < 3)
			return;
		mySpans = myLIs [1].getElementsByTagName ("span");
		if ((mySpans == null) || (mySpans.length < 1))
			return;
		playerName = mySpans [0].title;
		if (playerName == "")
			return;
		place = 2;
	}
	var playerText = playerName.substring (playerName.indexOf ("|") + 1, playerName.indexOf (": ") + 2);
	playerName = playerName.substr (playerName.indexOf (": ") + 2);
	var mySpan = document.createElement ("span");
	mySpan.className = "value tipsStandard";
	var myDiv = document.getElementById ("fleetStatusBar");
	if (myDiv)
	{
		var myLis2 = myDiv.getElementsByTagName ("li");
		if (myLis2.length > 0)
		{
			var mySpans2 = myLis2 [myLis2.length - 1].getElementsByTagName ("span");
			if (mySpans2.length > 0)
				mySpan.className += " " + mySpans2 [mySpans2.length - 1].className;
			if (mySpans2.length > 2)
				mySpan.appendChild (mySpans2 [mySpans2.length - 2].cloneNode (true));
		}
	}
	mySpan.appendChild (document.createTextNode (playerName));
	var myLI = document.createElement ("li");
	myLI.appendChild (document.createTextNode (playerText));
	myLI.appendChild (mySpan);
	myUL.insertBefore (myLI, myLIs [place]);
}) ();
