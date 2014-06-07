// ==UserScript==
// @name           OGame Redesign: Options in User Name
// @description    Links the user name in the top menu to the options and removes the Options item from the menu
// @namespace      Vess
// @version	   1.03
// @date           2012-02-14
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
	function addEvent (el, evt, fxn)
	{
		if (el.addEventListener)
			el.addEventListener (evt, fxn, false); // for standards
		else if (el.attachEvent)
			el.attachEvent ("on" + evt, fxn); // for IE
		else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
	}
	var divBar = document.getElementById ("bar");
	var divPlayer = document.getElementById ("playerName");
	if ((divBar == null) || (divPlayer == null))
		return;
	var text;
	var href = "";
	var lis = divBar.getElementsByTagName ("li");
	for (var i = 0; i < lis.length; i++)
	{
		var myLi = lis [i];
		href = myLi.firstChild.href;
		if ((href != null) && (href.indexOf ("page=preferences") >= 0))
		{
			text = myLi.firstChild.textContent;
			myLi.parentNode.removeChild (myLi);
			break;
		}
	}
	if ((href == null) || (href == ""))
		return;
	var span = divPlayer.getElementsByTagName ("span");
	if ((span == null) || (span.length < 1))
		return;
	var span = span [span.length - 1];
	divBar.style.position = "static";
	divPlayer.style.textAlign = "left";
	divPlayer.style.left = "0px";
	divPlayer.style.width = "150px";
	divPlayer.style.marginLeft = "20px";
	var playerText = divPlayer.firstChild.textContent;
	var span2 = document.createElement ("span");
	span2.appendChild (divPlayer.firstChild);
	span2.style.display = "none";
	divPlayer.insertBefore (span2, span);
	divPlayer.removeChild (span);
	var a = document.createElement ("a");
	a.setAttribute ("href", href);
	a.setAttribute ("title", "|" + text);
	a.className = "tipsStandard";
	a.style.textDecoration = "none";
	a.appendChild (span);
	var img = document.createElement ("img");
	//img.setAttribute ("src", "img/navigation/icon-edit-a.gif");
	img.setAttribute ("src", "data:image/gif;base64," +
		"R0lGODlhEAAQAOZcACc1Q6rK4z5VbGB8mjpPZT5UbERigUFcekVjhExphUVkhENffj1Ycz1WcTxW" +
		"cj1WcEZfejxWcTtPZUVfeUNhgEpngkNhglx5lEBZckVkg0Fac0FadD1Ua5KxyjpOZENgfi9EWpWz" +
		"zI6tyHiWsERhgV55klVyjUVgeYGfuUxmgExohWF8mkZjg198mEllgFZyjURigJCux4qpxGR8k46s" +
		"xVp2kUVgeklnh0pmgUNdeX2ZsVRyk5i30XyatIalwYWjvZSzzIWivD1UbXiWsYmow2F9mk9qhJKy" +
		"zExphEBbeUJffWaEom6Mp1d0kI2rxoyrxYmowmB9mmSCn5m40T5VbT1Xc3GPqjxXc0plgFt6l0ph" +
		"d2B6kgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5" +
		"BAEAAFwALAAAAAAQABAAQAfFgFwAg4SFhYIPWAGLKQ0RRgE/DxENgxgbJVMaQQE0MQEdlxqDFAYG" +
		"WT4sJAFHBjClBoMeBLQSWjMStASzBIMuOBVWixcmi09AFxWDSQfNi8+LPM2DDAPWA0UDUQMr1ksM" +
		"gyACBQUC4+TlDAIggxzm5joBQlQhW+4CgxMQHdDPJ/o2BiFRkQBKgBYJEjR5xiTBIAc5UIxY9KLG" +
		"oh4OqlwZpGTBByIBnAwJIGKBDCkeB1lQgKBlBgU7bijIsBIBAEGGcg7iEggAOw==");
	img.setAttribute ("align", "absmiddle");
	img.style.opacity = "0.5";
	a.appendChild (img);
	addEvent (a, "mouseover", function () { this.lastChild.style.opacity = "1"; });
	addEvent (a, "mouseout",  function () { this.lastChild.style.opacity = "0.5"; });
	divPlayer.appendChild (a);
}) ();
