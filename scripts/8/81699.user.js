// ==UserScript==
// @name           OGame Redesign: Missing Sats
// @description    Shows the number of Solar Sats that need to be built, in order to make the energy balance positive.
// @namespace      Vesselin
// @version        2.00
// @date           2012-10-26
// @include        http://*.ogame.*/game/index.php?page=resources*
// @include        http://*.ogame.*/game/index.php?page=shipyard*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((document.location.href.indexOf ("/game/index.php?page=resources") < 0) &&
	    (document.location.href.indexOf ("/game/index.php?page=shipyard")  < 0))
		return;
	var myFunc = (function ()
	{
		var version = $ ("meta[name='ogame-version']");
		if (version.length == 0)
			return;
		version = version.attr ("content");
		if (version === undefined)
			return;
		var versionMajor = version.split (".");
		if (versionMajor.length < 1)
			return;
		versionMajor = parseInt (versionMajor [0], 10);
		if (versionMajor < 5)
			return;
		var servers =
		[
			["AR.OGAME.ORG", "Sat."],
			["AE.OGAME.ORG", "Sat."],
			["BA.OGAME.ORG", "Sat."],
			["BG.OGAME.ORG" ,"Сат."],
			["OGAME.COM.BR", "Sat."],
			["OGAME.CZ",     "Sat."],
			["OGAME.DE",     "Sat."],
			["OGAME.DK",     "Sat."],
			["OGAME.COM.ES", "Sat."],
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
		$ ("#detail").ajaxSuccess (function (e, xhr, settings)
		{
			if ((settings.url.indexOf ("page=resources") < 0) && (settings.url.indexOf ("page=shipyard") < 0))
				return;
			if ($ ("#missingSats").length)
				return;
			var energyBalance = parseInt ($ ("#resources_energy").text ().replace (/[^\-\d]+/g, ""), 10);
			if (energyBalance >= 0)
				return;
			var energyPerSat = parseInt ($ (".solarSatEnergyInfo").text ().replace (/\D+/g, ""), 10);
			if (energyPerSat <= 0)
				return;
			var satsNeeded = Math.ceil (Math.abs (energyBalance) / energyPerSat);
			var server = document.location.href.match (/\/\/[^\.\/]+\.([^\/]+)/) [1].toUpperCase ();
			var locaSat = "Sat.";
			for (var i = 0; i < servers.length; i++)
				if (server.indexOf (servers [i] [0]) > -1)
				{
					locaSat = servers [i] [1];
					break;
				}
			$ (".solarSatEnergyInfo").append ('<span id="missingSats" style="color: red; cursor: pointer; cursor: hand"> (' + satsNeeded + " " + locaSat + ")</span>");
			$ ("#missingSats").click (function ()
			{
				$ ("#number").val (satsNeeded);
			});
		});
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
}) ();
