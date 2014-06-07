// ==UserScript==
// @name           OGame Redesign: Ogame Echange! in Header
// @description    Ajout d'un lien pop-up vers la page Ogame Echange!
// @version        1.00
// @date           2010-11-25
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
		["AR.OGAME.ORG", "Ogame Echange!"],
		["AE.OGAME.ORG", "Ogame Echange!"],
		["BA.OGAME.ORG", "Ogame Echange!"],
		["BG.OGAME.ORG" ,"Ogame Echange!"],
		["OGAME.COM.BR", "Ogame Echange!"],
		["OGAME.CZ",     "Ogame Echange!"],
		["OGAME.DE",     "Ogame Echange!"],
		["OGAME.DK",     "Ogame Echange!"],
		["OGAME.COM.ES", "Ogame Echange!"],
		["FI.OGAME.ORG", "Ogame Echange!"],
		["OGAME.FR",     "Ogame Echange!"],
		["OGAME.GR",     "Ogame Echange!ι"],
		["OGAME.COM.HR", "Ogame Echange!"],
		["OGAME.HU",     "Ogame Echange!"],
		["OGAME.IT",     "Ogame Echange!"],
		["OGAME.JP",     "Ogame Echange!"],
		["OGAME.LT",     "Ogame Echange!"],
		["OGAME.LV",     "Ogame Echange!"],
		["MX.OGAME.ORG", "Ogame Echange!"],
		["OGAME.NL",     "Ogame Echange!"],
		["OGAME.NO",     "Ogame Echange!"],
		["OGAME.PL",     "Ogame Echange!"],
		["OGAME.COM.PT", "Ogame Echange!"],
		["OGAME.RO",     "Ogame Echange!"],
		["OGAME.RS",     "Ogame Echange!"],
		["OGAME.RU",     "Ogame Echange!"],
		["OGAME.SE",     "Ogame Echange!"],
		["OGAME.SI",     "Ogame Echange!"],
		["OGAME.SK",     "Ogame Echange!"],
		["TR.OGAME.ORG", "Ogame Echange!"],
		["OGAME.TW",     "Ogame Echange!"],
		["OGAME.US",     "Ogame Echange!"],
		["OGAME.ORG",    "Ogame Echange!"]
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
	a.setAttribute ("href", "#");
	a.setAttribute ("onclick", "popupWindow('http://daaljegu.free.fr/ogame/echange/','Notice','auto','no','0','0','no','800','600','no');");
	a.setAttribute ("accesskey");
	a.appendChild (document.createTextNode (locaPranger));
	li.appendChild (a);
	li4.parentNode.insertBefore (li, li4);
}) ();