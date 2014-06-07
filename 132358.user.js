// ==UserScript==
// @name           OGame Redesign: Auction Timekeeper
// @namespace      Vesselin
// @version        1.04
// @date           2012-09-20
// @author         Vesselin Bontchev
// @description    Displays a countdown/countup timer for the Auction in OGame 4.*
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
	var gameClock = document.getElementById ("OGameClock");
	if (gameClock == null)
		gameClock = document.querySelector (".OGameClock");
	if (gameClock == null)
		return;
	var unsafe;
	try
	{
		unsafe = unsafeWindow;
	}
	catch (e)
	{
		unsafe = window;
	}
	function tickTock ()
	{
		var theTime = gameClock.lastChild.textContent.split (/:/);
		var minutes = theTime [1];
		var seconds = theTime [2];
		var timerStr = "";
		var timerColor = "white";
		var serverTime = unsafe.serverTime;
		var myTimer = document.getElementById ("auctionTimekeeper");
		if (myTimer == null)
			return;
		var currentTime  = serverTime.getTime ();
		var serverHour   = serverTime.getHours ();
		var serverMinute = serverTime.getMinutes ();
		var waitPeriod = 1000;
		var activationTime;
		if ((serverHour == 23) && (serverMinute >= 45))
		{
			activationTime = new Date (currentTime + 2 * 60 * 60 * 1000);
			activationTime.setHours (5);
			activationTime.setMinutes (45);
			activationTime.setSeconds (0);
			activationTime.setMilliseconds (0);
			waitPeriod = activationTime.getTime () - currentTime;
		}
		else if ((serverHour < 5) || ((serverHour == 5) && (serverMinute <= 45)))
		{
			activationTime = new Date ();
			activationTime.setHours (5);
			activationTime.setMinutes (45);
			activationTime.setSeconds (0);
			activationTime.setMilliseconds (0);
			waitPeriod = activationTime.getTime () - currentTime;
		}
		else if (minutes >= 45)
		{
			var secsLeft = 60 - seconds;
			var minsLeft = 59 - minutes;
			if (secsLeft == 60)
			{
				secsLeft = 0;
				minsLeft++;
			}
			timerStr = "[-";
			if (minsLeft < 10)
				timerStr += "0";
			timerStr += minsLeft + ":";
			if (secsLeft < 10)
				timerStr += "0";
			timerStr += secsLeft + "]";
		}
		else
		{
			timerStr = "[" + minutes + ":" + seconds + "]";
			if (minutes < 15)
				timerColor = "lime";
			else if (minutes < 30)
				timerColor = "yellow";
			else
				timerColor = "red";
		}
		var myDiv = document.getElementById ("div_traderAuctioneer");
		if (myDiv && (myDiv.style.display != "none"))
		{
			myTimer.textContent = timerStr;
			myTimer.style.color = timerColor;
			myTimer = document.getElementById ("auctionTimekeeper2");
		}
		if (myTimer)
		{
			myTimer.textContent = timerStr;
			myTimer.style.color = timerColor;
		}
		setTimeout (tickTock, waitPeriod);
	}
	var myTimer = document.createElement ("li");
	myTimer.setAttribute ("id", "auctionTimekeeper");
	myTimer.style.position = "absolute";
	myTimer.style.right = "-70px";
	gameClock.parentNode.appendChild (myTimer);
	if (url.indexOf ("page=traderOverview") >= 0)
	{
		var myTimer2;
		var myFunc = function ()
		{
			myTimer2 = document.createElement ("span");
			myTimer2.setAttribute ("id", "auctionTimekeeper2");
			myTimer2.style.marginLeft = "350px";
			document.querySelector ("#div_traderAuctioneer .resourceSelection").appendChild (myTimer2);
		}
		if (document.getElementById ("div_traderAuctioneer"))
			myFunc ();
		else
		{
			var $ = unsafe.$;
			$ ("#inhalt").ajaxSuccess (function ()
			{
				if ((document.getElementById ("div_traderAuctioneer") == null) || document.getElementById ("auctionTimekeeper2"))
					return;
				myFunc ();
			});
		}
	}
	setTimeout (tickTock, 0);
}) ();
