// ==UserScript==
// @name           OGame Redesign Missing Sats [Mod]
// @description    Shows the number of Solar Sats that need to be built, in order to make the energy balance positive.
// @namespace      Vesselin
// @version        1.04
// @date           2010-07-30
// @include        http://*.ogame.*/game/index.php?page=resources*
// @include        http://*.ogame.*/game/index.php?page=shipyard*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((document.location.href.indexOf ("/game/index.php?page=resources") == -1) &&
	    (document.location.href.indexOf ("/game/index.php?page=shipyard")  == -1))
		return;
	var servers = [
		["AR.OGAME.ORG", "Sat."],
		["AE.OGAME.ORG", "Sat."],
		["BA.OGAME.ORG", "Sat."],
		["BG.OGAME.ORG" ,"Сат."],
		["OGAME.COM.BR", "Sat."],
		["OGAME.CZ",     "Sat."],
		["OGAME.DE",     "Sat."],
		["OGAME.DK",     "Sat."],
		["OGAME.COM.ES", "Sat"],
		["FI.OGAME.ORG", "Sat."],
		["OGAME.FR",     "Sat."],
		["OGAME.GR",     "Η.Σ."],
		["OGAME.COM.HR", "Sat."],
		["OGAME.HU",     "N.M."],
		["OGAME.IT",     "Sat."],
		["OGAME.JP",     "Sat."],
		["OGAME.LT",     "Sat."],
		["OGAME.LV",     "Sat."],
		["MX.OGAME.ORG", "Sat."],
		["OGAME.NL",     "Sat."],
		["OGAME.NO",     "Sat."],
		["OGAME.PL",     "Sat."],
		["OGAME.COM.PT", "Sat."],
		["OGAME.RO",     "Sat."],
		["OGAME.RS",     "Sat."],
		["OGAME.RU",     "сс"],
		["OGAME.SE",     "Sat."],
		["OGAME.SI",     "Sat."],
		["OGAME.SK",     "Sat."],
		["OGAME.COM.TR", "Sat."],
		["TR.OGAME.ORG", "Sat."],
		["OGAME.TW",     "Sat."],
		["OGAME.US",     "Sat."],
		["OGAME.ORG",    "Sat."]
	];
	function showMissingSats ()
	{
		var theSpan = document.getElementById ("solarSatEnergyInfo");
		if (theSpan == null)
			return;
		var mySpan = document.getElementById ("missingSats");
		if (mySpan != null)
			return;
		var energyBalanceSpan = document.getElementById ("resources_energy");
		if (energyBalanceSpan == null)
			return;
		var energyBalance = parseInt (energyBalanceSpan.textContent.replace (/\./g, ""));
		if (energyBalance >= 0)
			return;
		var activePlanets = document.getElementsByClassName ("planetlink active");
		if ((activePlanets == null) || (typeof (activePlanets) == "undefined"))
			return;
		if (activePlanets.length < 1)
		{
			activePlanets = document.getElementsByClassName ("planetlink");
			if (activePlanets.length != 1)
				return;
		}
		var theNumbers =  activePlanets [0].title.split (/[^\d.-]+/);
		if (theNumbers.length < 2)
			return;
		var maxTemp = parseInt (theNumbers [theNumbers.length - 2]);
		var server = document.location.href.split (/\//) [2];
		var universe = server.split (/\./) [0];
		var uniNum = parseInt (universe.split (/\D+/) [1]);
		if (isNaN (uniNum))
			uniNum = 0;
		if ((uniNum > 0) && (uniNum < 100) && (server.toLowerCase () != "uni42.ogame.org"))
			energyPerSat = Math.floor (maxTemp / 4 + 20);
		else
			energyPerSat = Math.floor ((maxTemp + 140) / 6);
		var engineerBonus = 1.0;
		if (document.getElementById ("officers").getElementsByTagName ("a") [2].getElementsByTagName ("img") [0].getAttribute ("src").indexOf ("ingenieur_ikon.gif") > -1)
			engineerBonus = 1.1;
		var satsNeeded = Math.ceil (Math.abs (energyBalance) / energyPerSat / engineerBonus);
		var locaSat = "Sat.";
		server = server.replace (universe + ".", "").toUpperCase ();
		for (var i = 0; i < servers.length; i++)
			if (server.indexOf (servers [i] [0]) > -1)
			{
				locaSat = servers [i] [1];
				break;
			}
		mySpan = document.createElement ("span");
		mySpan.setAttribute ("id", "missingSats");
		mySpan.style.color = "red";
		mySpan.style.cursor = "pointer";
		mySpan.style.cursor = "hand";
		mySpan.appendChild (document.createTextNode (" " + satsNeeded + " " + locaSat + ""));
		mySpan.setAttribute ("onclick", "document.getElementById ('number').value = " + satsNeeded);
		theSpan.parentNode.appendChild (mySpan);
	}
	setInterval (showMissingSats, 500);
}
) ();
