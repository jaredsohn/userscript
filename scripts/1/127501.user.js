// ==UserScript==
// @name           OGame Redesign: Color Mission Name on 3rd Fleet Dispatch Page
// @description    Colors the mission name on the 3rd Fleet Dispatch page to match the icon color
// @namespace      Vess
// @version	   1.00
// @date           2012-03-04
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=fleet3") < 0)
		return;
	var missionColors = [
		[ 1, "#FD6F4B"],	// Attack
		[ 2, "#E6463C"],	// ACS-Attack
		[ 3, "#96C846"],	// Transport
		[ 4, "#50EAAF"],	// Deploy
		[ 5, "#D47835"],	// ACS-Defend
		[ 6, "#DCB93C"],	// Espionage
		[ 7, "#32E1DC"],	// Colonization
		[ 8, "#28C05B"],	// Recycle
		[ 9, "#FF3250"],	// Destroy
		[15, "#4B9CCD"]		// Expedition
	];
	function setMissionColor (myMission)
	{
		var theColor;
		for (var i = 0; i < missionColors.length; i++)
			if (missionColors [i] [0] == myMission)
			{
				theColor = missionColors [i] [1];
				break;
			}
		var myDiv = document.getElementById ("missionNameWrapper");
		if (myDiv)
		{
			var mySpans = myDiv.getElementsByTagName ("span");
			if (mySpans && mySpans.length > 0)
				mySpans [0].style.color = theColor;
		}
	}
	function addEvent (el, evt, fxn)
	{
		if (el.addEventListener)
			el.addEventListener (evt, fxn, false); // for standards
		else if (el.attachEvent)
			el.attachEvent ("on" + evt, fxn); // for IE
		else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
	}
	var missions = document.getElementsByName ("mission");
	if ((missions.length > 0) && (missions [0].value > 0))
		setMissionColor (missions [0].value);
	for (var i = 0; i < missionColors.length; i++)
	{
		var theMission = missionColors [i] [0];
		var myLi = document.getElementById ("button" + theMission);
		if (myLi.className == "on")
			addEvent (document.getElementById ("missionButton" + theMission), "click", function (e)
			{
				e = e || event;
				var eventEl = e.srcElement || e.target;
				setMissionColor (eventEl.id.match (/\d+$/));
			});
	}
}) ();
