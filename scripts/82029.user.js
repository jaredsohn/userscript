// ==UserScript==
// @name           OGame Redesign: Show IPM and Phalanx Range
// @namespace      Vesselin
// @version        1.01
// @date           2010-07-24
// @description    Shows which systems are covered by the sensor phalanx and the IPMs on their respective pages.
// @include        http://*.ogame.*/game/index.php?page=station*
// @include        http://*.ogame.*/game/index.php?page=defense*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((document.location.href.indexOf ("/game/index.php?page=station") < 0) &&
	    (document.location.href.indexOf ("/game/index.php?page=defense") < 0))
		return;
	document.getElementsByClassName = function (cl)
	{
		var retnode = [];
		var myclass = new RegExp ("\\b" + cl + "\\b");
		var elem = this.getElementsByTagName ("*");
		for (var i = 0; i < elem.length; i++)
		{
			var classes = elem [i].className;
			if (myclass.test (classes))
				retnode.push (elem [i]);
		}
		return retnode;
	}
	function showRange ()
	{
		var theSpan = document.getElementsByClassName ("solarSatEnergyInfo");
		if ((theSpan == null) || (theSpan.length < 1))
			return;
		if (theSpan [0].textContent.indexOf ("(") > -1)
			return;
		var coverage = parseInt (theSpan [0].textContent.match (/\d+/) [0]);
		var activeA = document.getElementsByClassName ("planetlink active");
		if (activeA.length == 0)
			activeA = document.getElementsByClassName ("planetlink");
		if (activeA.length < 1)
			return;
		var activeSpans = activeA [0].getElementsByTagName ("span");
		if (activeSpans.length < 2)
			return;
		var coords = activeSpans [1].textContent.split (/[\[:]/);
		var galaxy = parseInt (coords [1]);
		var system = parseInt (coords [2]);
		var system1 = system - coverage;
		var system2 = system + coverage;
		if (document.location.href.indexOf ("/game/index.php?page=station") > -1)
		{
			system1++;
			system2--;
		}
		if (system1 < 1)
			system1 = 1;
		if (system2 > 499)
			system2 = 499;
		var range = " (" + galaxy + ":" + system1 + " - " + galaxy + ":" + system2 + ")";
		theSpan [0].innerHTML += range;
	}
	setInterval (showRange, 500);
}
) ();
