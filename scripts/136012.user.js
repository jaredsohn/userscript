// ==UserScript==
// @name           OGame Redesign: Auction Timer
// @namespace      Vesselin
// @version        1.07
// @date           2013-04-11
// @description    Displays a countdown timer for the Auction in OGame 4.*
// @include        http://*.ogame.*/game/index.php?*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?") < 0)
		return;
	var myFunc1 = (function ()
	{
		function myIo ()
		{
			if (typeof (io) == "undefined")
			{
				setTimeout (myIo, 500);
				return;
			}
			var oldMins = -1;
			var first = false;
			var overflowAuctionTimer = null;
			var newMins, mins, secs, auctionTimer, auctionEndTime, currentTime;
			var uni = document.location.href.replace (/^http:\/\/([^\/]+).+/, "$1");
			function changeTimeLeft (timer, timeLeft)
			{
				if (typeof (timer) != "object")
					return;
				var time = new Date ();
				if (typeof (timer.countdown) == "object")
				{
					timer.countdown.startTime = time.getTime ();
					timer.countdown.startLeftoverTime = timeLeft;
				}
				else if (typeof (timer.countdownObject) == "object")
				{
					timer.countdownObject.startTime = time.getTime ();
					timer.countdownObject.startLeftoverTime = timeLeft;
				}
			}
			if ($ ("#auctionTimer").length)
				return;
			$ ("p.auction_info").next ().before ('<span id="auctionTimer" style="font-weight: bold; color: ' + $ ("p.auction_info span").css ("color") + ';"></span>');
			if ($ ("#div_traderAuctioneer .left_header h2").text ().indexOf (loca.auctionFinished) < 0)
			{
				auctionEndTime = localStorage.getItem (uni + "_auctionEndTime");
				auctionEndTime = (auctionEndTime) ? parseInt (auctionEndTime) : -1;
				currentTime = new Date ().getTime ();
				if (auctionEndTime >= currentTime)
				{
					secs =  Math.round ((auctionEndTime - currentTime) / 1000);
					oldMins = Math.ceil (secs / 60);
					first = false;
				}
				else
				{
					oldMins = parseInt ($ ("p.auction_info").text ().match (/\d+/g) [0]);
					secs = oldMins * 60;
					first = true;
				}
				mins = oldMins;
				auctionTimer = new simpleCountdown ($ ("#auctionTimer").get (0), secs, function () { $ ("#auctionTimer").text (""); });
			}
			var mySock = new io.connect ("/auctioneer",
			{
				port: auctioneerPort
			});
			mySock.on ("timeLeft", function (msg)
			{
				if ($ ("#div_traderAuctioneer .left_header h2").text ().indexOf (loca.auctionFinished) >= 0)
				{
					first = true;
					localStorage.setItem (uni + "_auctionEndTime", "-1");
					return;
				}
				auctionEndTime = localStorage.getItem (uni + "_auctionEndTime");
				auctionEndTime = (auctionEndTime) ? parseInt (auctionEndTime) : -1;
				currentTime = new Date ().getTime ();
				/<b>\D+(\d+)/.exec (msg);
				newMins = parseInt (RegExp.$1);
				if (newMins == oldMins)
				{
					mins--;
					if (first)
						first = false;
					else if (auctionEndTime >= 0)
						localStorage.setItem (uni + "_auctionEndTime", currentTime + mins * 60 * 1000);
				}
				else
				{
					if ((newMins > oldMins) && (auctionEndTime >= currentTime))
						newMins = Math.round ((auctionEndTime - currentTime) / (1000 * 60));
					if (first)
						first = false;
					else if (oldMins >= 0)
						localStorage.setItem (uni + "_auctionEndTime", currentTime + newMins * 60 * 1000);
					oldMins = newMins;
					mins = newMins;
				}
				if (mins)
					changeTimeLeft (auctionTimer, mins * 60);
				else
					overflowAuctionTimer = new simpleCountdown ($ ("#auctionTimer").get (0), 30, function () { $ ("#auctionTimer").text (""); });
				setTimeout (function ()
				{
					$ ("#auctionTimer").css ("color", $ ("p.auction_info span").css ("color"));
				}, 100);
			});
			mySock.on ("new auction", function (msg)
			{
				/<b>\D+(\d+)/.exec (msg.info);
				mins = parseInt (RegExp.$1);
				auctionTimer = new simpleCountdown ($ ("#auctionTimer").get (0), mins * 60, function () { $ ("#auctionTimer").text (""); });
				overflowAuctionTimer = null;
				first = true;
				setTimeout (function ()
				{
					$ ("#auctionTimer").css ("color", $ ("p.auction_info span").css ("color"));
				}, 100);
			});
			mySock.on ("auction finished", function (msg)
			{
				changeTimeLeft (auctionTimer, 0);
				changeTimeLeft (overflowAuctionTimer, 0);
				first = true;
				localStorage.setItem (uni + "_auctionEndTime", "-1");
			});
		}
		if (document.getElementById ("div_traderAuctioneer"))
			myIo ();
		else
		{
			$ (document).ajaxSuccess (function ()
			{
				if ($ ("#auctionTimer").length == 0)
					myIo ();
			});
		}
	}).toString ();
	var myFunc2 = (function ()
	{
		var uni = document.location.href.replace (/^http:\/\/([^\/]+).+/, "$1");
		var auctionEndTime = localStorage.getItem (uni + "_auctionEndTime");
		if (auctionEndTime == null)
			return;
		auctionEndTime = parseInt (auctionEndTime);
		var currentTime = new Date ().getTime ();
		if (auctionEndTime < currentTime)
			return;
		var clock = $ ("#OGameClock");
		if (clock.length <= 0)
			clock = $ (".OGameClock")
		if (clock.length <= 0)
			return;
		clock.parent ().append ('<li id="auctionTimer" style="position: absolute; right: 125px;"></li>');
		var auctionTimer = new simpleCountdown ($ ("#auctionTimer").get (0),
			Math.round ((auctionEndTime - currentTime) / 1000),
			function () { $ ("#auctionTimer").text (""); });
	}).toString ();
	function injectScript (myFunc)
	{
		var script = document.createElement ("script");
		script.setAttribute ("type", "application/javascript");
		script.textContent = "(" + myFunc + ") ();";
		document.body.appendChild (script);
	}
	if (document.location.href.indexOf ("/game/index.php?page=traderOverview") >= 0)
		injectScript (myFunc1);
	else if (document.getElementById ("bar"))
		injectScript (myFunc2);
}) ();
