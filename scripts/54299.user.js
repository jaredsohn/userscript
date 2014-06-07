// ==UserScript==
// @name           Ogame Resources in Flight
// @namespace      Oliver
// @description    Displays how many resources are in flight on the overview page
// @include        http://uni*.ogame.*/game/index.php?page=overview*
// @exclude        http://uni6.ogame.de/*
// @exclude        http://uni42.ogame.org/*
// @exclude        http://a*.ogame.*
// @exclude        http://b*.ogame.*
// @exclude        http://c*.ogame.*
// @exclude        http://d*.ogame.*
// @exclude        http://e*.ogame.*
// @exclude        http://f*.ogame.*
// @exclude        http://g*.ogame.*
// @exclude        http://h*.ogame.*
// @exclude        http://i*.ogame.*
// @exclude        http://j*.ogame.*
// @exclude        http://k*.ogame.*
// @exclude        http://l*.ogame.*
// @exclude        http://m*.ogame.*
// @exclude        http://n*.ogame.*
// @exclude        http://o*.ogame.*
// @exclude        http://p*.ogame.*
// @exclude        http://q*.ogame.*
// @exclude        http://r*.ogame.*
// @exclude        http://sirius*.ogame.*
// @exclude        http://t*.ogame.*
// @exclude        http://ursa*.ogame.*
// @exclude        http://v*.ogame.*
// @exclude        http://w*.ogame.*
// @exclude        http://x*.ogame.*
// @exclude        http://y*.ogame.*
// @exclude        http://z*.ogame.*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=overview") == -1)
		return;
	// You might want to translate these two in your own language:
	var totalStr = "Total:";
	var titleStr = "Resources in flight: ";
	var colors = ["red", "deepskyblue", "cornflowerblue", "yellow"];	// MetalColor, CrystalColor, DeuteriumColor, TitleColor
	var expanded;
	if (typeof GM_setValue == "function") // greasemonkey
		expanded = GM_getValue ("expanded", false);
	else if (typeof PRO_setValue == "object") // ie7pro
	{
		expanded = PRO_getValue ("expanded", false);
		if (expanded == 0)
			expanded = false;
		else if (expanded == -1)
			expanded = true;
	}
	else
		expanded = false;
	var any = false;
	var resInfo = new Object;
	var myTd;
	var dropdown = document.getElementById ("header_top").getElementsByTagName ("select") [0];
	var planetSelection = dropdown.getElementsByTagName ("option") [dropdown.selectedIndex].innerHTML.replace (/\t+/, "").replace (/  /g, " ");
	var curPlanet = "=>" + planetSelection.split (/ [\(\[]/) [0].replace (/\s+$/, "");
	var curPlanetCoords = planetSelection.split (/[\[\]]/) [1];
	var curPlanetRes = new Array (0, 0, 0);
	var resources = document.getElementById ("resources").getElementsByTagName ("tr");
	document.getElementsByClassName = function (cl)
	{
		var retnode = [];
		var elem = this.getElementsByTagName ("*");
		for (var i = 0; i < elem.length; i++)
			if (elem [i].className == cl)
				retnode.push (elem [i]);
		return retnode;
	}
	function processFlightType (type, character, resInfo)
	{
		var allFlights = document.getElementsByClassName (type);
		for (var i = 0; i < allFlights.length; i++)
		{
			var links = allFlights [i].getElementsByTagName ("a");
			for (var j = 0; j < links.length; j++)
			{
				var title = links [j].title;
				if ((title != null) && (title != "") && (title.indexOf (":") == -1))
				{
					title = title.replace (/([\d\.]+)([^\d\.]+)/g, "$1, $2");
					links [j].title = title;
				}
			}
			if ((links.length < 5) || (links [5] == null))
				continue;
			var elements = links [5].title.split (": ");
			var destCoords = links [3].innerHTML.replace (/[\[\]]/g, "");
			var destination = allFlights [i].childNodes [3].firstChild.childNodes [5].textContent + '[' + destCoords + ']';
			var flightType = character + links [4].innerHTML;
			var myRes = new Array (0, 0, 0);
			for (var j = 0; j < 3; j++)
				myRes [j] = parseInt (elements [j + 2].replace (/\./g, ""));
			any = true;
			if (resInfo [flightType])
			{
				for (var j = 0; j < 3; j++)
					resInfo [flightType] [j] += myRes [j];
				resInfo [flightType] [4] += 1;
			}
			else
				resInfo [flightType] = new Array (myRes [0], myRes [1], myRes [2], 0, 1);
			if (destination.indexOf (planetSelection) >= 0)
				for (var j = 0; j < 3; j++)
					curPlanetRes [j] += myRes [j];
		}
		return resInfo;
	}
	function doTable ()
	{
		function addEvent (el, evt, fxn)
		{
			if (el.addEventListener)
				el.addEventListener (evt, fxn, false); // for standards
			else if (el.attachEvent)
				el.attachEvent ("on" + evt, fxn); // for IE
			else el ["on" + evt] = fxn; // old style, but defeats purpose of using this function
		}
		function addDots (n)
		{
			n += "";
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test (n))
				n = n.replace (rgx, "$1" + "." + "$2");
			return n;
		}
		function createColorBElement (text, color)
		{
			var myB = document.createElement ("b");
			var myTextNode = document.createTextNode (text);
			if (color != "")
			{
				var myFont = document.createElement ("font");
				myFont.color = color;
				if (text == titleStr)
					myFont.setAttribute ("id", "titleRes");
				myFont.appendChild (myTextNode);
				myB.appendChild (myFont);
			}
			else
				myB.appendChild (myTextNode);
			return myB;
		}
		function createCell (row, text, width, alignment, color)
		{
			var myTd = row.insertCell (-1);
			myTd.style.width = width;
			myTd.style.paddingRight = "1em";
			myTd.style.paddingLeft  = "1em";
			myTd.style.whiteSpace = "pre";
			myTd.setAttribute ("align", alignment);
			myTd.appendChild (createColorBElement (text, color));
		}
		if (document.getElementById ("titleRes") != null)
			return;
		var myText;
		resInfo [totalStr]  = new Array (0, 0, 0, 0, 0);
		resInfo [curPlanet] = new Array (0, 0, 0, 0, 0);
		for (var myRes in resInfo)
			resInfo [myRes] [3] = 0;
		for (var myRes in resInfo)
			for (var i = 0; i < 3; i++)
			{
				if (myRes == curPlanet)
					resInfo [curPlanet] [i] = curPlanetRes [i] + parseInt (resources [2].getElementsByTagName ("font") [i].innerHTML.replace (/\./g, ""));
				else if (myRes != totalStr)
					resInfo [totalStr] [i] += resInfo [myRes] [i];
				resInfo [myRes] [3] += resInfo [myRes] [i];
			}
		var titleRes = document.getElementById ("titleRes");
		if ((titleRes != null) && (titleRes.onclick != null))
			titleRes.removeEventListenet ("click", redrawTable, false);
		if (expanded)
		{
			myTd.style.paddingLeft = "0em";
			var myTable = document.createElement ("table");
			myTable.setAttribute ("border", "2");
			myTable.setAttribute ("bordercolor", "yellow");
			myTable.setAttribute ("rules", "all");
			myTable.setAttribute ("width", "100%");
			myTable.setAttribute ("cellpadding", "0");
			myTable.setAttribute ("cellspacing", "0");
			var myTr = myTable.insertRow (-1);
			createCell (myTr, titleStr, "24%", "center", colors [3]);
			for (var i = 0; i < 3; i++)
				createCell (myTr, rstrings [i] + ":", "19%", "center", colors [i]);
			createCell (myTr, totalStr, "19%", "center", "");
			for (var myRes in resInfo)
			{
				myTr = myTable.insertRow (-1);
				myText = myRes;
				if ((myRes != curPlanet) && (myRes != totalStr))
					myText += " (" + addDots (resInfo [myRes] [4]) + ")";
				createCell (myTr, myText, "24%", "center", "");
				for (var i = 0; i < 3; i++)
					createCell (myTr, addDots (resInfo [myRes] [i]), "19%", "right", "");
				createCell (myTr, addDots (resInfo [myRes] [3]), "19%", "right", "");
			}
			myTd.appendChild (myTable);
		}
		else
		{
			myTd.style.paddingLeft = "1em";
			myTd.appendChild (createColorBElement (titleStr, colors [3]));
			myTd.appendChild (createColorBElement (rstrings [0] + ": ", colors [0]));
			myTd.appendChild (createColorBElement (addDots (resInfo [totalStr] [0]) + ", ", ""));
			myTd.appendChild (createColorBElement (rstrings [1] + ": ", colors [1]));
			myTd.appendChild (createColorBElement (addDots (resInfo [totalStr] [1]) + ", ", ""));
			myTd.appendChild (createColorBElement (rstrings [2] + ": ", colors [2]));
			myTd.appendChild (createColorBElement (addDots (resInfo [totalStr] [2]) + ".", ""));
		}
		titleRes = document.getElementById ("titleRes");
		titleRes.style.cursor = "pointer";
		addEvent (titleRes, "click", redrawTable);
	}
	function redrawTable ()
	{
		while (myTd.hasChildNodes ())
			myTd.removeChild (myTd.firstChild);
		expanded = ! expanded;
		if (typeof GM_setValue == "function") // greasemonkey
			GM_setValue ("expanded", expanded);
		else if (typeof PRO_setValue == "object") // ie7pro
			PRO_setValue ("expanded", expanded);
		doTable ();
	}
	for (var i = 0; i < 3; i++)
		curPlanetRes [i] = 0;
	resInfo = processFlightType ("flight",  ">", resInfo);
	resInfo = processFlightType ("return",  "<", resInfo);
	resInfo = processFlightType ("holding", "=", resInfo);
	if (any)
	{
		var table = document.getElementById ("content").getElementsByTagName ("table") [0];
		var rows = table.getElementsByTagName ("tr");
		var rowNum = 0;
		var longRows = 0;
		for (var i = 0; i < rows.length; i++)
		{
			var myTd = rows [i].getElementsByTagName ("td");
			if ((myTd.length > 0) && (myTd [0].getAttribute ("colspan") == "4"))
			{
				longRows++;
				if (longRows == 2)
				{
					rowNum = i + 1;
					break;
				}
			}
		}
		var rstrings = new Array ("", "", "");
		for (var i = 0; i < 3; i++)
			rstrings [i] = resources [1].getElementsByTagName ("font") [i].innerHTML;
		myTd = table.insertRow (rowNum).insertCell (-1);
		myTd.setAttribute ("colSpan", "4");
		doTable ();
	}
}
)();
