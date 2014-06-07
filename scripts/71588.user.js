// ==UserScript==
// @name           OGame Redesign: Moons to the Right
// @description    Makes the icon of the moon larger and to the right for easier clicking.
// @namespace      Vesselin
// @version        1.08
// @date           2012-12-14
// @author         Vesselin Bontchev
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
// @exclude        http://*.ogame.*/game/index.php?page=allianceBroadcast*
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
	var moons = document.querySelectorAll ("a.moonlink");
	if (moons.length == 0)
		return;
	for (var i = 0; i < moons.length; i++)
	{
		var thisMoon = moons [i];
		thisMoon.style.left = "105px";
		thisMoon.style.top  =  "15px";
		thisMoon.style.padding = "6px";
		thisMoon.className = thisMoon.className.replace ("tooltipLeft", "tooltipRight");
		var img = thisMoon.getElementsByTagName ("img") [0];
		img.removeAttribute ("width");
		img.removeAttribute ("height");
		img.style.width  = "24px";
		img.style.height = "24px";
	}
	var wrenches = document.querySelectorAll ("a.constructionIcon");
	for (var i = 0; i < wrenches.length; i++)
	{
		var thisWrench = wrenches [i];
		thisWrench.style.left = "105px";
		thisWrench.style.top  =  "22px";
	}
	var alerts = document.querySelectorAll ("a.alert");
	for (var i = 0; i < alerts.length; i++)
	{
		var thisAlert = alerts [i];
		thisAlert.style.left = "132px";
		thisAlert.style.top  =   "0px";
	}
})();
