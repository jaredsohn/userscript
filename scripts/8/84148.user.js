// ==UserScript==
// @name           OGame Redesign: Show Resource Details
// @description    Shows the details of the top resource boxes near them
// @namespace      Vesselin
// @version        1.03
// @date           2011-10-21
// @author         Vesselin Bontchev
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
// @exclude        http://*.ogame.*/game/index.php?page=allianceBroadcast*
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
	function showResInfo (resName)
	{
		var resourceBox = document.getElementById (resName + "_box");
		if (resourceBox == null)
			return;
		var resourceTitle = resourceBox.title;
		var myMatch;
		if (resName == "energy")
		{
			myMatch = resourceTitle.match (/<B>(.+)<\/B>[^\d]+([\d\-\.]+)[^\d]+\(([\d\.]+)\/([\d\.]+)/i);
			if (myMatch == null)
				myMatch = resourceTitle.match (/^(.+)\|[^\d]+([\d\.]+)[^\d]+([\d\.]+)[^\d]+([\d\.]+)/i);
		}
		else
		{
			myMatch = resourceTitle.match (/<B>(.+)<\/B>[^\d]+([\d\.]+)\/([\d\.]+)[^\(]+(\([\+\-\.\d]+\))/i);
			if (myMatch == null)
			{
				myMatch = resourceTitle.match (/<B>(.+)<\/B>[^\d]+([\d\.]+)[^\d]+([\d\.]+)[^\d]+([\d\.]+)/i);
				if (myMatch == null)
					myMatch = resourceTitle.match (/^(.+)\|[^\d]+([\d\.]+)[^\d]+([\d\.]+)[^\d]+([\d\.]+)/i);
			}
		}
		if (myMatch == null)
			return;
		var myDiv = document.createElement ("div");
		myDiv.style.position = "absolute";
		myDiv.style.width = "45px";
		myDiv.style.margin = "-35px 0px 0px 53px";
		myDiv.style.fontSize = "9px";
		myB = document.createElement ("b");
		var resTitle = "";
		if (resName == "darkmatter")
		{
			var words = myMatch [1].split (" ");
			for (var i = 0; i < words.length; i++)
				resTitle += words [i].substring (0, 1);
			resTitle += ":";
		}
		else
			resTitle = myMatch [1];
		myB.appendChild (document.createTextNode (resTitle));	// Res_title
		myDiv.appendChild (myB);
		myDiv.appendChild (document.createElement ("br"));
		var mySpan = document.createElement ("span");
		mySpan.style.color = "rgb(153, 153, 153)";
		mySpan.appendChild (document.createTextNode (myMatch [3]));	// Res_storage
		myDiv.appendChild (mySpan);
		myDiv.appendChild (document.createElement ("br"));
		mySpan = document.createElement ("span");
		mySpan.className = "undermark";
		mySpan.appendChild (document.createTextNode (myMatch [4]))	// Res_production
		myDiv.appendChild (mySpan);
		if ((resName != "energy") && (resName != "darkmatter"))
		{
			function toTime (hours)
			{
				var time = "";
				if (Math.floor (hours) == "Infinity" || Math.floor (hours) == "-Infinity")
					return "";
				time += Math.floor (hours) + "h";
				if (Math.floor (hours) < 99)
					time += Math.floor (((hours * 100) - Math.floor (hours)) % 60) + "m";
				return time;
			}
			function toNumber (text)
			{
				return parseInt (text.replace (/[^\d]/g, ""));
			}
			myDiv.appendChild (document.createElement ("br"));
			var hoursToFill = (toNumber (myMatch [3]) - toNumber (myMatch [2])) / toNumber (myMatch [4]);
			myDiv.appendChild (document.createTextNode (toTime (hoursToFill)));
		}
		resourceBox.appendChild (myDiv);
	}
	showResInfo ("metal");
	showResInfo ("crystal");
	showResInfo ("deuterium");
	showResInfo ("darkmatter");
	showResInfo ("energy");
}
) ();
