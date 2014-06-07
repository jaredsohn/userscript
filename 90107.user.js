// ==UserScript==
// @name           OGame Redesign: Pranger in Header
// @description    Puts a link to the Pranger in the header of the game window
// @version        1.03
// @date           2010-08-21
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=buddies*
// @exclude        http://*.ogame.*/game/index.php?page=notices*
// @exclude        http://*.ogame.*/game/index.php?page=showmessage*
// @exclude        http://*.ogame.*/game/index.php?page=trader*
// @exclude        http://*.ogame.*/game/index.php?page=search*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((document.location.href.indexOf ("/game/index.php?page=")           == -1) ||
	    (document.location.href.indexOf ("/game/index.php?page=buddies")     > -1) ||
	    (document.location.href.indexOf ("/game/index.php?page=notices")     > -1) ||
	    (document.location.href.indexOf ("/game/index.php?page=showmessage") > -1) ||
	    (document.location.href.indexOf ("/game/index.php?page=trader")      > -1) ||
	    (document.location.href.indexOf ("/game/index.php?page=search")      > -1))
		return;
	var servers = [
		["AR.OGAME.ORG", "Pillory"],
		["AE.OGAME.ORG", "Pranger"],
		["BA.OGAME.ORG", "Sramni stup"],
		["BG.OGAME.ORG" ,"Наказани"],
		["OGAME.COM.BR", "Pranger"],
		["OGAME.CZ",     "Pranýř"],
		["OGAME.DE",     "Pranger"],
		["OGAME.DK",     "Pranger"],
		["OGAME.COM.ES", "Pillory"],
		["FI.OGAME.ORG", "Häpeäpaalu"],
		["OGAME.FR",     "Pilori"],
		["OGAME.GR",     "Τιμωρημένοι"],
		["OGAME.COM.HR", "Sramni stup"],
		["OGAME.HU",     "Kitiltottak"],
		["OGAME.IT",     "Lista Ban"],
		["OGAME.JP",     "Pranger"],
		["OGAME.LT",     "Užblokuotieji"],
		["OGAME.LV",     "Kauna Stabs"],
		["MX.OGAME.ORG", "Pillory"],
		["OGAME.NL",     "Schandpaal"],
		["OGAME.NO",     "Banliste"],
		["OGAME.PL",     "Pręgierz"],
		["OGAME.COM.PT", "Bloqueados"],
		["OGAME.RO",     "Banatilor"],
		["OGAME.RS",     "Стуб Срама"],
		["OGAME.RU",     "Столб позора"],
		["OGAME.SE",     "Skampåle"],
		["OGAME.SI",     "Sramotilni steber"],
		["OGAME.SK",     "Sieň hanby"],
		["TR.OGAME.ORG", "Teşhir Direği"],
		["OGAME.TW",     "Pranger"],
		["OGAME.US",     "Pranger"],
		["OGAME.ORG",    "Pranger"]
	];
	var server = document.location.href.split (/\//) [2];
	var universe = server.split (/\./) [0];
	server = server.replace (universe + ".", "").toUpperCase ();
	var locaPranger = "Pranger";
	for (var i = 0; i < servers.length; i++)
		if (server.indexOf (servers [i] [0]) > -1)
		{
			locaPranger = servers [i] [1];
			break;
		}

	var div = document.getElementById ("bar");
	if ((div == null) || (div.length < 5))
		return;
	var li4 = div.getElementsByTagName ("li") [4];
	var li = document.createElement ("li");
	var a = document.createElement ("a");
	a.setAttribute ("href", "tdoh.forumfree.it/");
	a.setAttribute ("target", "_blank");
	a.appendChild (document.createTextNode (locaPranger));
	li.appendChild (a);
	li4.parentNode.insertBefore (li, li4);
}) ();