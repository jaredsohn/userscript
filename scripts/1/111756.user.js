// ==UserScript==
// @name           OGame Redesign: Return Fleet Question
// @description    Asks the user for confirmation before returning a fleet.
// @namespace      Vesselin
// @version        1.02
// @date           2012-10-11
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=movement") < 0)
		return;
	function getWord (id)
	{
		var decisionYes = document.getElementById (id);
		if (decisionYes == null)
			return "";
		var myOnClick = decisionYes.parentNode.getAttribute ("onclick");
		if ((myOnClick == null) || (myOnClick == ""))
			return "";
		var parts = myOnClick.split ("'");
		if (parts.length < 2)
			return "";
		return parts [1];
	}
	function addEvent (el, evt, fxn)
	{
		if (el.addEventListener)
			el.addEventListener (evt, fxn, false); // for standards
		else if (el.attachEvent)
			el.attachEvent ("on" + evt, fxn); // for IE
		else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
	}
	function myIndexOf (myArray, myElement)
	{
		if (myArray == null)
			return -1;
		for (var i = 0; i < myArray.length; i++)
			if (myArray [i] == myElement)
				return i;
		return -1;
	}
	function fixTheLink (flight, flightID, enabled)
	{
		var theAs = flight.getElementsByTagName ("a");
		if (theAs.length < 1)
			return;
		var myA = theAs [0];
		var url = document.location.href + "&return=" + flight.parentNode.getAttribute ("id").match (/(\d+)/) [1];
		myA.href = "#";
		myA.removeAttribute ("onclick");
		myA.setAttribute ("onclick", "cancelFlight ('" + url + "', '" + questionTitle + "', '" + questionBody + "', " + enabled + ")");
		myA.style.textDecoration = "none";
		myA.getElementsByTagName ("img") [0].style.verticalAlign = "middle";
		var mySpan = document.createElement ("span");
		mySpan.setAttribute ("id", "qMark" + flightID);
		mySpan.style.color = "silver";
		mySpan.style.fontWeight = "bold";
		mySpan.style.cursor = "hand";
		mySpan.style.cursor = "pointer";
		mySpan.style.opacity = (enabled) ? "1.0" : "0.6";
		mySpan.appendChild (document.createTextNode (" ?"));
		flight.appendChild (mySpan);
		addEvent (mySpan, "click", function ()
		{
			var enabled = (this.style.opacity == "1");
			if (enabled)
			{
				turnedOff.push (flightID);
				this.style.opacity = "0.6";
			}
			else
			{
				turnedOff.splice (turnedOff.indexOf (flightID), 1);
				this.style.opacity = "1.0";
			}
			var myA = this.parentNode.getElementsByTagName ("a") [0];
			var newOnClick = myA.getAttribute ("onclick").replace (/,\s+\w+\)/, ", " + ! enabled + ")");
			myA.removeAttribute ("onclick");
			myA.setAttribute ("onclick", newOnClick);
			localStorage.setItem ("returnFleetOffQs", JSON.stringify (turnedOff));
		});
	}
	if (! (typeof PRO_setValue == "function") && (! this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString ().indexOf ("not supported") > -1)))
	{
		this.GM_getValue = function (key, def)
		{
			return localStorage.getItem (key);
		}
		this.GM_setValue = function (key, value)
		{
			return localStorage.setItem (key, value);
		}
		this.GM_deleteValue = function (key)
		{
			return localStorage.deleteItem (key);
		}
	}
	var yesWord = getWord ("errorBoxDecisionYes");
	yesWord = (yesWord.length) ? ("'" + yesWord + "'") : ('LocalizationStrings ["yes"]');
	var noWord  = getWord ("errorBoxDecisionNo");
	noWord  = (noWord.length)  ? ("'" + noWord  + "'") : ('LocalizationStrings ["no"]');
	var myCode =
	"var theURL;\n" +
	"function cancelFlight (url, title, question, enabled)\n" +
	"{\n" +
		"\ttheURL = url;\n" +
		"\tif (enabled)\n" +
			"\t\terrorBoxDecision (title, '' + question + '', " + yesWord + ", " + noWord + ", returnFlightStart);\n" +
		"\telse\n" +
			"\t\twindow.location.replace (theURL);\n" +
	"}\n" +
	"function returnFlightStart ()\n" +
	"{\n" +
		"\twindow.location.replace (theURL);\n" +
		"\tcloseErrorBox ();\n" +
	"}\n";
	var myScript = document.createElement ("script");
	myScript.setAttribute ("type", "text/javascript");
	if (window.opera)
		myScript.innerText = myCode;
	else
		myScript.innerHTML = myCode;
	document.body.appendChild (myScript);
	if (GM_getValue ("ReturnFleetQuestion"))
		GM_deleteValue ("ReturnFleetQuestion");
	var turnedOff = new Array ();
	turnedOff = JSON.parse (localStorage.getItem ("returnFleetOffQs"));
	if (turnedOff == null)
		turnedOff = [];
	var retFlights = document.querySelectorAll ("span.reversal");
	for (var i = 0; i < retFlights.length; i++)
	{
		var flight = retFlights [i];
		var flightID = flight.parentNode.id.match (/(\d+)/) [1];
		if (myIndexOf (turnedOff, flightID) >= 0)
			fixTheLink (flight, flightID, false);
		else
		{
			var questionTitle = flight.parentNode.querySelector ("span.originData span.originCoords a").textContent + " => " +
				flight.parentNode.querySelector ("span.destinationData span.destinationCoords a").textContent;
			var questionBody = "";
			var tableCells = flight.parentNode.querySelectorAll ("span.starStreak div.route div table.fleetinfo tr td");
			for (var j = 0; j < tableCells.length; j += 2)
			{
				if (tableCells [j].textContent.match (/^\s+$/))
					break;
				questionBody += tableCells [j].textContent + " " + tableCells [j + 1].textContent.replace (/\s+/g, "") + ", ";
			}
			questionBody = questionBody.replace (/, $/, "");
			fixTheLink (flight, flightID, true);
		}
	}
}) ();
