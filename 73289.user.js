// ==UserScript==
// @name           OGame: Color Flight Slots
// @namespace      Vess
// @description    Color-codes the number of free/used flight slots: red - none free, yellow - one free, green - more free
// @version        1.06
// @date           2012-11-01
// @include        http://*.ogame.*/game/index.php?page=flotten1*
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==

(function ()
{
	document.getElementsByClassName = function (cl)
	{
		var retnode = [];
		var myclass = new RegExp ('\\b' + cl + '\\b');
		var elem = this.getElementsByTagName ('*');
		for (var i = 0; i < elem.length; i++)
		{
			var classes = elem [i].className;
			if (myclass.test (classes))
				retnode.push (elem [i]);
		}
		return retnode;
	}
	var flights, flightDiff, expDiff, slotColor;
	if (document.location.href.indexOf ("/game/index.php?page=flotten1") > -1)
	{
		var myTR = document.getElementById ("content").getElementsByTagName ("table") [0].getElementsByTagName ("table") [0].getElementsByTagName ("tr") [0];
		var myTDs = myTR.getElementsByTagName ("td");
		flights = myTDs [0].textContent.match (/\d+/g);
		flightDiff = parseInt (flights [1]) - parseInt (flights [0]);
		if (flights.length > 2)
			flightDiff += parseInt (flights [2]);
		if (flightDiff <= 0)
			slotColor = "red";
		else if (flightDiff == 1)
			slotColor = "yellow";
		else
			slotColor = "lime";
		myTDs [0].style.color = slotColor;
		flights = myTDs [1].innerHTML.match (/\d+/g);
		expDiff = parseInt (flights [1]) - parseInt (flights [0]);
		if ((expDiff <= 0) || (flightDiff <= 0))
			slotColor = "red";
		else
			slotColor = "lime";
		myTDs [1].style.color = slotColor;
	}
	else if (document.location.href.indexOf ("/game/index.php?page=fleet1") > -1)
	{
		var myDivs = document.getElementById ("slots").getElementsByTagName ("div");
		if (myDivs [0].className == "fleft tiptipsStandard")
			myDivs [0].className = "fleft tipsStandard";	// Fix a stupid 2.1.3 bug
		flights = myDivs [0].textContent.match (/\d+/g);
		flightDiff = parseInt (flights [1]) - parseInt (flights [0]);
		if (flightDiff <= 0)
			slotColor = "red";
		else if (flightDiff == 1)
			slotColor = "yellow";
		else
			slotColor = "lime";
		var mySpans = myDivs [0].getElementsByTagName ("span");
		myDivs  [0].style.color = slotColor;
		flights = myDivs [myDivs.length - 1].textContent.match (/\d+/g);
		expDiff = parseInt (flights [1]) - parseInt (flights [0]);
		if ((expDiff <= 0) || (flightDiff <= 0))
			slotColor = "red";
		else
			slotColor = "lime";
		myDivs [myDivs.length - 1].style.color = slotColor;
	}
	else if (document.location.href.indexOf ("/game/index.php?page=movement") > -1)
	{
		var mySpan = document.getElementsByClassName ("fleetSlots") [0];
		flights = mySpan.textContent.match (/\d+/g);
		flightDiff = parseInt (flights [1]) - parseInt (flights [0]);
		if (flightDiff <= 0)
			slotColor = "red";
		else if (flightDiff == 1)
			slotColor = "yellow";
		else
			slotColor = "lime";
		mySpan.getElementsByTagName ("span") [0].style.color = slotColor;
		mySpan = document.getElementsByClassName ("expSlots") [0];
		flights = mySpan.textContent.match (/\d+/g);
		expDiff = parseInt (flights [1]) - parseInt (flights [0]);
		if ((expDiff <= 0) || (flightDiff <= 0))
			slotColor = "red";
		else
			slotColor = "lime";
		mySpan.getElementsByTagName ("span") [0].style.color = slotColor;
	}
})();
