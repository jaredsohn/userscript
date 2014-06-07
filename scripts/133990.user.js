// ==UserScript==
// @name           OGame Redesign: Inventory Button
// @namespace      Vesselin
// @version        1.00
// @date           2012-05-22
// @description    Makes the icon of the Alliance button open the message box.
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
	if ((url.indexOf ("/game/index.php")                         < 0) ||
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
	var inventory = [
		"http://gf1.geo.gfsrv.net/cdn18/550ca74a5f8402c3c2025886b20fc4.png",
		"http://gf1.geo.gfsrv.net/cdna7/53901a4a9695e144f581671e0c6da2.png"
	];
	var menuTable = document.getElementById ("menuTable");
	if (menuTable == null)
		return;
	var lis = menuTable.getElementsByTagName ("li");
	for (var i = 0; i < lis.length; i++)
	{
		var thisLi = lis [i];
		var button = thisLi;
		var links = button.getElementsByTagName ('a');
		for (var j = 0; j < links.length; j++)
			if (links [j].getAttribute ("href").indexOf ("page=shop") >= 0)
			{
				var a = document.createElement ("a");
				a.setAttribute ("target", "_self");
				a.setAttribute ("href", "index.php?page=shop#page=inventory");
				var span = document.createElement ("span");
				span.setAttribute ("class", "menu_icon");
				span.appendChild (a);
				var img = document.createElement ("img");
				img.setAttribute ("class", "mouseSwitch");
				img.setAttribute ("height", "29");
				img.setAttribute ("width", "38");
				img.setAttribute ("src", inventory [0]);
				img.setAttribute ("rel", inventory [1]);
				a.appendChild (img);
				thisLi.replaceChild (span, thisLi.firstElementChild);
				return;
			}
	}
}
)();
