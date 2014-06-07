// ==UserScript==
// @name           OGame Redesign: Alliance icon opens the message box
// @namespace      Vesselin
// @version        1.10
// @date           2011-10-21
// @description    Makes the icon of the Alliance button open the message box.
// @include        http://*.ogame.*/game/index.php?page=*
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
	if ((url.indexOf ("/game/index.php?page=")                   < 0) ||
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
	var alliance = Array ();
	var research = Array ();
	var oldVersion = false;
	var oVersion = document.getElementsByName ("ogame-version");
	if (oVersion && (oVersion.length > 0))
	{
		var versionParts = oVersion [0].content.split (".");
		if (parseInt (versionParts [0]) < 2)
			oldVersion = true;
		else if (parseInt (versionParts [1]) < 3)
			oldVersion = true;
	}
	else
		oldVersion = true;
	if (oldVersion)
	{
		alliance =
		[
			"img/navigation/navi_ikon_alliance_a.gif",
			"img/navigation/navi_ikon_alliance_b.gif"
		];
		research =
		[
			"img/navigation/navi_ikon_research_a.gif",
			"img/navigation/navi_ikon_research_b.gif"
		];
	}
	else
	{
		alliance =
		[
			"http://gf1.geo.gfsrv.net/bb/e95e882e8916c0be653cb7a57e9581.gif",
			"http://gf1.geo.gfsrv.net/05/5492a049ce3b74efc44f0e7a66f73b.gif"
		];
		research =
		[
			"http://gf1.geo.gfsrv.net/42/46d133829e8b9e025470dd1d4ec79d.gif",
			"http://gf1.geo.gfsrv.net/f0/6ddd15cc22223be8f74ffa541c9997.gif"
		];
	}
	function setIcon (page)
	{
		var menuTable = document.getElementById ("menuTable");
		if (menuTable == null)
			return;
		var lis = menuTable.getElementsByTagName ("li");
		for (var i = 0; i < lis.length; i++)
		{
			var thisLi = lis [i];
			var button = thisLi;
			var links = button.getElementsByTagName ('a');
			var session = document.location.href.match (/&session=([a-z0-9]{12})/) [1];
			for (var j = 0; j < links.length; j++)
			{
				var a, span, img;
				if (links [j].getAttribute ("href").match ("page=" + page + "&") != null)
				{
					a = document.createElement ("a");
					var imageA, imageB;
					switch (page)
					{
						case "network":
						case "alliance":
							a.setAttribute ("target", "_self");
							a.setAttribute ("href", "index.php?page=networkkommunikation&session=" + session);
							imageA = alliance [0];
							imageB = alliance [1];
							break;
						case "research":
							a.setAttribute ("target", "_blank");
							a.setAttribute ("href", "index.php?page=globalTechtree&session=" + session);
							imageA = research [0];
							imageB = research [1];
							break;
					}
					span = document.createElement ("span");
					span.setAttribute ("class", "menu_icon");
					span.appendChild (a);
					img = document.createElement ("img");
					img.setAttribute ("class", "mouseSwitch");
					img.setAttribute ("height", "29");
					img.setAttribute ("width", "38");
					img.setAttribute ("src", imageA);
					img.setAttribute ("rel", imageB);
					a.appendChild (img);
					thisLi.replaceChild (span, thisLi.firstElementChild);
					return;
				}
			}
		}
	}
	setIcon ("network");
	setIcon ("alliance");	// Stupid Redesign version 1.2.1...
	setIcon ("research");
	if (document.location.href.indexOf ("page=galaxy") > -1)
	{
		var envelope = document.getElementById ("message_alert_box");
		if (envelope == null)
			envelope = document.getElementById ("message_alert_box_default");
		envelope.style.position = "absolute";
		envelope.style.left = "2px";
		envelope.style.top = "-60px";
		var element = document.getElementById ("inhalt");
		element.appendChild (envelope);
		envelope = document.getElementById ("attack_alert");
		envelope.style.position = "absolute";
		envelope.style.left = "600px";
		envelope.style.top = "0px";
		element.appendChild (envelope);
	}
	else if (document.location.href.indexOf ("page=networkkommunikation") > -1)
	{
		var myScript = document.createElement ("script");
		myScript.setAttribute ("type", "text/javascript");
		myScript.setAttribute ("language", "javascript");
		myScript.text = "function fadeBox () {}";
		document.body.appendChild (myScript);
	}
}
)();
