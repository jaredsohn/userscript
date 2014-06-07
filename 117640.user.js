// ==UserScript==
// @name           OGame Redesign: Flying Resources in Event List
// @namespace      Vesselin
// @version        1.04
// @date           2012-12-26
// @description    Shows the sum of flying resources in the event list.
// @include        http://*.ogame.*/game/index.php*page=*
// @exclude        http://*.ogame.*/game/index.php?page=search*
// @exclude        http://*.ogame.*/game/index.php?page=logout*
// @exclude        http://*.ogame.*/game/index.php?page=buddies*
// @exclude        http://*.ogame.*/game/index.php?page=notices*
// @exclude        http://*.ogame.*/game/index.php?page=payment*
// @exclude        http://*.ogame.*/game/index.php?page=showmessage*
// @exclude        http://*.ogame.*/game/index.php?page=traderlayer*
// @exclude        http://*.ogame.*/game/index.php?page=rocketlayer*
// @exclude        http://*.ogame.*/game/index.php?page=searchLayer*
// @exclude        http://*.ogame.*/game/index.php?page=combatreport*
// @exclude        http://*.ogame.*/game/index.php?page=globalTechtree*
// @exclude        http://*.ogame.*/game/index.php?page=station*&openJumpgate=1*
// ==/UserScript==

(function ()
{
	var url = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((url.indexOf ("/game/index.php?")                        < 0) ||
	    (url.indexOf ("/game/index.php?page=search")            >= 0) ||
	    (url.indexOf ("/game/index.php?page=logout")            >= 0) ||
	    (url.indexOf ("/game/index.php?page=buddies")           >= 0) ||
	    (url.indexOf ("/game/index.php?page=notices")           >= 0) ||
	    (url.indexOf ("/game/index.php?page=payment")           >= 0) ||
	    (url.indexOf ("/game/index.php?page=showmessage")       >= 0) ||
	    (url.indexOf ("/game/index.php?page=traderlayer")       >= 0) ||
	    (url.indexOf ("/game/index.php?page=searchLayer")       >= 0) ||
	    (url.indexOf ("/game/index.php?page=rocketlayer")       >= 0) ||
	    (url.indexOf ("/game/index.php?page=combatreport")      >= 0) ||
	    (url.indexOf ("/game/index.php?page=globalTechtree")    >= 0) ||
	    (url.indexOf ("/game/index.php?page=allianceBroadcast") >= 0))
		return;
	var $;
	try
	{
		$ = unsafeWindow.$;
	}
	catch (e)
	{
		$ = window.$;
	}
	const colors = ["crimson", "deepskyblue", "cornflowerblue", "yellow"];	// MetalColor, CrystalColor, DeuteriumColor, TitleColor
	const titleImg = "data:image/jpg;base64," +
		"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcU" +
		"FhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgo" +
		"KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUACEDASIA" +
		"AhEBAxEB/8QAGwABAAICAwAAAAAAAAAAAAAAAAYHAQMCBAX/xAArEAACAQMDBAAEBwAAAAAAAAAB" +
		"AgMEBREABhITFCExIjJBURUjQ2GBkbH/xAAXAQEBAQEAAAAAAAAAAAAAAAAEAQID/8QAHBEAAgMB" +
		"AAMAAAAAAAAAAAAAAAECESEDBDEz/9oADAMBAAIRAxEAPwCqdn2O3Wujo6++VUkNJJ1ahZOAJcom" +
		"FSJDjqNydcrkA5GcAEiW1N3tkMdVVDaVY0FOsTNUVFSIiQxAXlCqNwZh6Tnk5yCQDiIistW3rFHe" +
		"7DVyT3rqRU6sKZWiSPgS+RImesCvzYZQDgfc9QbxlrrLt22XLt56BblUVFQskIVmaRhyYsjcsYkc" +
		"jAXB9csDEnrosXhYN3uVooYY6u4We2NBUusa9O6ZKocHDII2OMBiWPHAP9+DSWK0Q3+ottYgldFZ" +
		"zJRTCeKJeR8lwuG4qPi458g41t2Durb9o2Xb/wAbpurcYamVYsOF/LR0eMOWGCOQdcZ+Vjrnddz2" +
		"2us9HbaG21EFPHCyCslgLMFWHpIxUsFduGR4IwzcvGPPGV00jcaUk6IX0E01p7j99NOwLpjay09O" +
		"7zyUVJVmCOQqlVEJFPj6g+/X8atnb+wNrVRSontAZOAVYO6nCI3EsXGJOWTkD3j4R49ktNC7tpYK" +
		"gvRK4np9u1NRWWa30VPWNH1u6aPqz5HL9ZyZDn65bz69eNUbfqqaZpTI5Leck+Sxx7P++Pvppq+O" +
		"2+VsxL6kZ6jaaaaSYo//2Q==";
	var metal, crystal, deuterium, curMetal, curCrystal, curDeuterium, metalName, crystalName, deuteriumName, numEmpties, numFlights, curPlanetName;
	function collectData (data, isCurrent)
	{
		var tooltip_th = data.replace (/\n/g, "").split ("<th");
		if (! tooltip_th [2])
			return;
		var tooltip_td = tooltip_th [2].split ("<td");
		var flightMetal     = parseInt (tooltip_td [2].match (/>([\d.]+)</) [1].replace (/\./g, ""));
		var flightCrystal   = parseInt (tooltip_td [4].match (/>([\d.]+)</) [1].replace (/\./g, ""));
		var flightDeuterium = parseInt (tooltip_td [6].match (/>([\d.]+)</) [1].replace (/\./g, ""));
		metal     += flightMetal;
		crystal   += flightCrystal;
		deuterium += flightDeuterium;
		if (isCurrent)
		{
			curMetal     += flightMetal;
			curCrystal   += flightCrystal;
			curDeuterium += flightDeuterium;
		}
		if (metalName == "")
		{
			metalName     = tooltip_td [1].match (/>(.+)</) [1];
			crystalName   = tooltip_td [3].match (/>(.+)</) [1];
			deuteriumName = tooltip_td [5].match (/>(.+)</) [1];
		}
		if ((flightMetal == 0) && (flightCrystal == 0) && (flightDeuterium == 0))
			numEmpties++;
	}
	function displayData ()
	{
		function addDots (n)
		{
			n += '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test (n))
			n = n.replace (rgx, "$1.$2");
			return n;
		}
		if (metal + crystal + deuterium <= 0)
			return;
		var myText =
			'<tr id="resourcesInFlight">' +
			'<td colspan="11">' +
					'<img src="' + titleImg + '" style="vertical-align: middle;">' +
					'<font color="' + colors [3] + '">(' + (numFlights - numEmpties) + "/" + numFlights + "): </font>" +
					'<font color="' + colors [0] + '">' + metalName     + "</font> " + addDots (metal)     + ", " +
					'<font color="' + colors [1] + '">' + crystalName   + "</font> " + addDots (crystal)   + ", " +
					'<font color="' + colors [2] + '">' + deuteriumName + "</font> " + addDots (deuterium) + "."  +
					/*
					"<br>" +
					"=> " + curPlanetName + ": " +
					'<font color="' + colors [0] + '">' + metalName     + "</font> " + addDots (curMetal)     + ", " +
					'<font color="' + colors [1] + '">' + crystalName   + "</font> " + addDots (curCrystal)   + ", " +
					'<font color="' + colors [2] + '">' + deuteriumName + "</font> " + addDots (curDeuterium) + "."  +
					*/
				"</td>" +
			"</tr>";
		$ (myText).insertBefore ($ ("#eventContent tr").eq (0));
	}
	function sumResources ()
	{
		var urls = [];
		var activeURLs = [];
		var curPlanetCoords = "";
		metal = 0;
		crystal = 0;
		deuterium = 0;
		curMetal = 0;
		curCrystal = 0;
		curDeuterium = 0;
		metalName = "";
		crystalName = "";
		deuteriumName = "";
		numURLs = 0;
		numEmpties = 0;
		numFlights = 0;
		curPlanetName = "";
		function doRequest (url, isCurrent)
		{
			$.ajax (
			{
				dataType: "html",
				cache: false,
				url: url,
				success: function (data)
				{
					collectData (data, isCurrent);
				},
				complete: function ()
				{
					displayData ();
				}
			});
		}
		curPlanetName = $ ("#selectedPlanetName").text ();
		if ($ (".planetlink").length == 1)
			curPlanetCoords = $ (".planetlink span.planet-koords").text ();
		else
			curPlanetCoords = $ (".planetlink.active span.planet-koords").text ();
		$ ("#eventContent .eventFleet").each (function ()
		{
			var eventFleet = $ (this);
			var url = eventFleet.find (".tipsTitleArrowClose,.tooltipClose").eq (0).attr ("rel");
			if (! url)
				return;
			if ((eventFleet.find (".tipsTitleArrowClose,.tooltipClose").eq (0).parent ().attr ("class") != "icon_movement") ||
			    (eventFleet.find (".missionFleet img").eq (0).attr ("src").indexOf ("4dab966bded2d26f89992b2c6feb4c") >= 0) ||
			    (eventFleet.find (".missionFleet img").eq (0).attr ("src").indexOf ("icon-stationieren") >= 0))
			{
				urls.push (url);
				var planetName = eventFleet.find (".originFleet span").attr ("title");
				if (planetName && (planetName.length > 0))
					planetName = planetName.substring (1)
				else
					planetName = $.trim (eventFleet.find (".destFleet").text ());
				activeURLs.push ((planetName == curPlanetName) &&
						 (eventFleet.find (".coordsOrigin").text () == curPlanetCoords));
			}
		});
		numFlights = urls.length;
		if (numFlights)
			for (var i in urls)
				doRequest (urls [i], activeURLs [i]);
		else
		{
			$ ("#eventContent .eventFleet").each (function ()
			{
				var eventFleet = $ (this);
				var isDeploy =  (eventFleet.find (".missionFleet img").eq (0).attr ("src").indexOf ("4dab966bded2d26f89992b2c6feb4c") >= 0) ||
						(eventFleet.find (".missionFleet img").eq (0).attr ("src").indexOf ("icon-stationieren") >= 0);
				if ((eventFleet.find ("td.icon_movement_reserve").length > 0) || isDeploy)
				{
					numFlights++;
					var planetName = eventFleet.find ("." + ((isDeploy) ? "dest" : "origin") + "Fleet span").attr ("title");
					if (planetName && (planetName.length > 0))
						planetName = planetName.substring (1)
					else
						planetName = $.trim (eventFleet.find ("." + ((isDeploy) ? "dest" : "origin") + "Fleet").text ());
					var isCurrent = (planetName == curPlanetName) && (eventFleet.find ((isDeploy) ? ".destCoords" : ".coordsOrigin").text () == curPlanetCoords);
					activeURLs.push (isCurrent);
					var title = eventFleet.find ("td.icon_movement" + ((isDeploy) ? "" : "_reserve") + " span").attr ("title");
					collectData (title, isCurrent);
				}
			});
			displayData ();
		}
	}
	if ($ ("table#eventContent").length > 0)
		sumResources ();
	else
		$ ("#eventboxContent").ajaxSuccess (function (e, xhr, settings)
		{
			if (settings.url.replace (/^.*page=([a-zA-Z]*).*$/, "$1") != "eventList")
				return;
			sumResources ();
		});
})();
