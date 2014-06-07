// ==UserScript==
// @name           OGame Redesign: Spy from the Fleet Movement Page
// @description    Adds an "Espionage" icon to the outgoing attack flights on the fleet movement page
// @namespace      Vesselin
// @version        1.05
// @date           2011-10-19
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=movement") < 0)
		return;
	function addEvent (el, evt, fxn)
	{
		if (el.addEventListener)
			el.addEventListener (evt, fxn, false); // for standards
		else if (el.attachEvent)
			el.attachEvent ("on" + evt, fxn); // for IE
		else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
	}
	function putSpyButton (flight)
	{
		var fleetSlots = document.querySelector ("div.fleetStatus span.fleetSlots");
		if (parseInt (fleetSlots.querySelector ("span.current").textContent) >=
		    parseInt (fleetSlots.querySelector ("span.all").textContent))
			return;
		var isOpened = flight.className.indexOf ("detailsOpened") >= 0;
		var sendMail = flight.querySelector ("span.sendMail");
		var spyButton = flight.querySelector ("span.mySpyButton");
		var mySpan;
		if (sendMail == null)
			return;
		if (spyButton == null)
		{
			var destination = flight.querySelector ("span.destinationData span a");
			if (destination == null)
				return;
			var href = destination.href;
			if (href.indexOf ("position=") < 0)
			{
				var coords = destination.textContent.split (/[:\]]+/);
				if (coords.length >= 3)
					href += "&position=" + coords [2];
			}
			var destImg = flight.querySelector ("span.starStreak div.destination img");
			if (destImg == null)
				return;
			var hasCommander = document.querySelector ("div#officers a img").getAttribute ("src").indexOf ("commander_ikon.gif") >= 0;
			var targetType = (destImg.getAttribute ("src").indexOf ("/moon/") < 0) ? "1" : "3";
			if (hasCommander || (targetType == "1"))
				href += "&planetType=" + targetType + "&doScan=1";
			else
			{
				href += "&type=" + targetType + "&mission=6";
				href = href.replace ("page=galaxy", "page=fleet1");
			}
			var myImg = document.createElement ("img");
			myImg.width = "16";
			myImg.height = "16";
			myImg.src = "data:image/gif;base64,R0lGODlhEAAQAJEDAP///1x2i2+JnQAAACH5BAEAAAMALAAAAAAQABAAAAIrXI6Zpu0P4wMUyFohxs4G+h1eIAhAaVboiZor67YlvMrtRtv6zvf84EMNCgA7";
			var myA = document.createElement ("a");
			myA.target = "_top";
			myA.href= href;
			myA.appendChild (myImg);
			mySpan = document.createElement ("span");
			mySpan.className = "mySpyButton";
			if (isOpened)
			{
				mySpan.style.position = "relative";
				mySpan.style.left = "510px";
				mySpan.style.top = "25px";
				sendMail.style.left = "510px";
				sendMail.style.top = "45px";
			}
			else
			{
				mySpan.style.position = "absolute";
				mySpan.style.left = "603px";
				mySpan.style.top = "3px";
				sendMail.style.left = "";
				sendMail.style.top = "";
			}
			mySpan.appendChild (myA);
			sendMail.parentNode.insertBefore (mySpan, sendMail);
		}
		else
		{
			mySpan = spyButton;
			if (isOpened)
			{
				mySpan.style.position = "relative";
				mySpan.style.left = "510px";
				mySpan.style.top = "25px";
				sendMail.style.left = "510px";
				sendMail.style.top = "45px";
			}
			else
			{
				mySpan.style.position = "absolute";
				mySpan.style.left = "603px";
				mySpan.style.top = "3px";
				sendMail.style.left = "";
				sendMail.style.top = "";
			}
		}
	}
	function putAllSpyButtons (addListener)
	{
		var flights = document.querySelectorAll ("div.fleetDetails");
		for (var i = 0; i < flights.length; i++)
		{
			var flight = flights [i];
			var id = flight.getAttribute ("id");
			if (id == "resourcesInFlight")
				continue;
			var direction = flight.querySelector ("span.starStreak a");
			if ((direction == null) || (direction.className.indexOf ("fleet_icon_reverse") >= 0))
				continue;
			var mission = flight.querySelector ("span.mission");
			if ((mission == null) || (mission.className.indexOf ("hostile") < 0))
				continue;
			putSpyButton (flight);
			if (addListener)
				addEvent (flight.querySelector ("span.openDetails a"), "click", function (e)
				{
					var targ;
					if (! e)
						var e = window.event;
					if (e.target)
						targ = e.target;
					else if (e.srcElement)
						targ = e.srcElement;
					if (targ.nodeType == 3) // defeat Safari bug
						targ = targ.parentNode;
					putSpyButton (targ.parentNode.parentNode.parentNode);
				});
		}
	}
	putAllSpyButtons (true);
	addEvent (document.querySelector ("span.closeAll a"), "click", function ()
	{
		setTimeout (function ()
		{
			putAllSpyButtons (false);
		}, 0);
	});
}
) ();
