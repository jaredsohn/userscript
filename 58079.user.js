// ==UserScript==
// @name           OGame Redesign: Resources in Flight
// @description    Displays how many resources are in flight on the overview page
// @namespace      Vesselin
// @version        1.34
// @date           2012-12-06
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==

(function ()
{
	// Settings:
	const colors = ["crimson", "deepskyblue", "cornflowerblue", "yellow"];	// MetalColor, CrystalColor, DeuteriumColor, TitleColor
	const below = false;
	const onlyToCurrent = true;
	const inEventList = true;
	const totalStr = "=";
	const titleImg = "data:image/jpg;base64," +
		"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcU" +
		"FhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgo" +
		"KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUACEDASIA" +
		"AhEBAxEB/8QAGwABAAICAwAAAAAAAAAAAAAAAAYHAQMCBAX/xAArEAACAQMDBAAEBwAAAAAAAAAB" +
		"AgMEBREABhITFCExIjJBURUjQ2GBkbH/xAAXAQEBAQEAAAAAAAAAAAAAAAAEAQID/8QAHBEAAgMB" +
		"AAMAAAAAAAAAAAAAAAECESEDBDEz/9oADAMBAAIRAxEAPwCqdn2O3Wujo6++VUkNJJ1ahZOAJcom" +
		"FSJDjqNydcrkA5GcAEiW1N3tkMdVVDaVY0FOsTNUVFSIiQxAXlCqNwZh6Tnk5yCQDiIistW3rFHe" +
		"7DVyT3rqRU6sKZWiSPgS+RImesCvzYZQDgfc9QbxlrrLt22XLt56BblUVFQskIVmaRhyYsjcsYkc" +
		"jAXB9csDEnrosXhYN3uVooYY6u4We2NBUusa9O6ZKocHDII2OMBiWPHAP9+DSWK0Q3+ottYgldFZ" +
		"zJRTCeKJeR8lwuG4qPi458g41t2Durb9o2Xb/wAbpurcYamVYsOF/LR0eMOWGCOQdcZ+Vjrnddz2" +
		"2us9HbaG21EFPHCyCslgLMFWHpIxUsFduGR4IwzcvGPPGV00jcaUk6IX0E01p7j99NOwLpjay09O" +
		"7zyUVJVmCOQqlVEJFPj6g+/X8atnb+wNrVRSontAZOAVYO6nCI3EsXGJOWTkD3j4R49ktNC7tpYK" +
		"gvRK4np9u1NRWWa30VPWNH1u6aPqz5HL9ZyZDn65bz69eNUbfqqaZpTI5Leck+Sxx7P++Pvppq+O" +
		"2+VsxL6kZ6jaaaaSYo//2Q==";
	const closeImg = "data:image/gif;base64," +
		"R0lGODlhFwAWANUAABYaHgsNEAECAgwQEBUaHRYdHxASFREUFxUYHAoMDhIVFxIUFxETFw4QEhsf" +
		"IxgfIA4RExETFhwhJS2sQBofJAkKDBofIxwgJAkLDRgfIRofIi6xQRsgJRoeIhkdIQgKCxkeIQ8S" +
		"FA4RFBkfIAwPEwkLDBgeIAwODy6tQBASFhgdIBgdIQ8SFhccHw0QEi6vQQ8SFRoeIwwOEBsgJA4Q" +
		"Ew8RFA0PEQAAAQ0PEhsfJC2tQBwgJQAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAXABYAAAb/wIRC" +
		"sWAcDgxGJJJsKg7DYcAQMYRgBph2q2XBUobUclmriSDltHpdu8JCEAhtTq/b4yJRLe5q+BsugTiD" +
		"OH2BgXSAODaMhI6Pji6Mk5SMh5WVMpqbMjYyAwMboIyanpwBAScnmwGhGxsnqLKomgkVGBgluRgn" +
		"L76+FR/CHxXFAgI3ycoCEzrOOs3IysvHycfNz84vE8jSNwIECAQEAAQv2dkvKOMA7R8qLfEtKOfo" +
		"z74F8R77KisrHiZMPMgwMAPBESMeKAQBooOHGDE0SNQAsaJFiw4sOAAxw4FHBzlChqRAMkdJkTlm" +
		"dJjBcsaFCyhjomy5suWOmzh3cNjJISdOGAstZ/gcStSCBAkviSr9SeKohKVKJZAIAgA7";
	const openImg  = "data:image/gif;base64," +
		"R0lGODlhFwAWANUAABYaHgsNEAECAgwQEBUaHRYdHxASFREUFxUYHAoMDhIVFxIUFxETFw4QEhsf" +
		"IxgfIA4RExETFhwhJS2sQBofJAkKDBofIxwgJAkLDRgfIRofIi6xQRsgJRoeIhkdIQgKCxkeIQ8S" +
		"FA4RFBkfIAwPEwkLDBgeIAwODy6tQBASFhgdIBgdIQ8SFhccHw0QEi6vQQ8SFRoeIwwOEBsgJA4Q" +
		"Ew8RFA0PEQAAAQ0PEhsfJC2tQBwgJQAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAXABYAAAb/QJJk" +
		"Rywaj0SJkmRBOo+Xi7L5rM6uM+qRw+U4sbMONkcum8tRsPhMoeTabrNj7piBHBZHbM/v8zWAGnse" +
		"HSAgD4gjIw8ZjYwPJiYeKysqHpctLQUvLzqen58vKJmZKh8AqAQEKJ2goQQAqggEAje2tQITraAT" +
		"ArU3vr+2wwI6E7zCxAIVzB/OHxWc0icYJdUYGBUJMjIB3t8BJxvjAwHcMicn3ufcNu02AwMb8TLu" +
		"7O82+fr5Lv37//xwCBxIsCAOfThcNKDBsF+/Bi4IOmxAESIECDVEiLjIsKPHjzQuhoABI0SNkyhT" +
		"qoQg4mSElxFSGEgBgwXJmzcNlDQQwUAAEwVAFRxQwKBo0ZdFDxxgsABogiAAOw==";
	// Code:
	if (! (typeof PRO_setValue == "function") && (! this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString ().indexOf ("not supported") > -1)))
	{
		this.GM_getValue = function (key, def)
		{
			return localStorage.getItem (key) || def;
		}
		this.GM_setValue = function (key, value)
		{
			return localStorage.setItem (key, value);
		}
		this.GM_deleteValue = function (key)
		{
			return localStorage.removeItem (key);
		}
	}
	if (document.location.href.indexOf ('/game/index.php?page=movement') >= 0)
	{
		var expanded;
		if (typeof GM_setValue == "function") // greasemonkey
			expanded = GM_getValue ("expanded", false) == "true";
		else if (typeof PRO_setValue == "function") // ie7pro
			expanded = PRO_getValue ("expanded", false) == "true";
		else
			expanded = below;
		var div;
		var planetRes = [0, 0, 0];
		var curPlanet = "";
		var curPlanetCoords = "";
		function doTable ()
		{
			function addDots (n)
			{
				n += '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test (n))
					n = n.replace (rgx, '$1' + '.' + '$2');
				return n;
			}
			function createFontElement (text, color)
			{
				var myFont = document.createElement ("font");
				myFont.color = color;
				var myTextNode = document.createTextNode (text);
				myFont.appendChild (myTextNode);
				return myFont;
			}
			function createCell (row, text, width, alignment, color)
			{
				var myTd = row.insertCell (-1);
				myTd.style.width = width;
				myTd.style.paddingRight = "1em";
				myTd.style.paddingLeft  = "1em";
				myTd.setAttribute ("align", alignment);
				myTd.setAttribute ("nowrap", true);
				if (text.indexOf ("data:image") < 0)
					myTd.appendChild (createFontElement (text, color));
				else
				{
					var myImg = document.createElement ("img");
					myImg.setAttribute ("src", text);
					myTd.appendChild (myImg);
				}
			}
			function addEvent (el, evt, fxn)
			{
				if (el.addEventListener)
					el.addEventListener (evt, fxn, false); // for standards
				else if (el.attachEvent)
					el.attachEvent ("on" + evt, fxn); // for IE
				else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
			}
			var mya;
			var span = document.createElement ("span");
			span.className = "current";
			if ((mya != null) && (mya.onclick != null))
				mya.removeEventListenet ("click", redrawTable, false);
			var mySpan = document.createElement ("span");
			mya = document.createElement ("a");
			mya.setAttribute ("href", "javascript:void(0)");
			var myImg = document.createElement ("img");
			myImg.style.position = "absolute";
			mya.appendChild (myImg);
			mySpan.appendChild (mya);
			if (expanded)
			{
				planetRes [0] = parseInt (document.getElementById ("resources_metal").textContent.replace (/\D+/gi, ""));
				planetRes [1] = parseInt (document.getElementById ("resources_crystal").textContent.replace (/\D+/gi, ""));
				planetRes [2] = parseInt (document.getElementById ("resources_deuterium").textContent.replace (/\D+/gi, ""));
				resInfo [curPlanet] [3] = 0;
				for (var i = 0; i < 3; i++)
				{
					resInfo [curPlanet] [i] = ((onlyToCurrent) ? toPlanet [i] : resInfo [totalStr] [i]) + planetRes [i];
					resInfo [curPlanet] [3] += resInfo [curPlanet] [i];
				}
				var myTable = document.createElement ("table");
				myTable.setAttribute ("border", "2");
				myTable.setAttribute ("bordercolor", "yellow");
				myTable.setAttribute ("rules", "all");
				myTable.setAttribute ("width", "100%");
				var myTr = myTable.insertRow (-1);
				createCell (myTr, titleImg, "24%", "center", colors [3]);
				for (var i = 0; i < 3; i++)
					createCell (myTr, rstrings [i], "19%", "center", colors [i]);
				createCell (myTr, totalStr, "19%", "center", colors [3]);
				myImg.style.left = "96%";
				myImg.style.top = "0%";
				myImg.setAttribute ("src", closeImg);
				myTr.lastChild.setAttribute ("height", "23");
				myTr.lastChild.appendChild (mySpan);
				for (var resIndex in resInfo)
					if (resInfo [resIndex] [3] > 0)
					{
						myTr = myTable.insertRow (-1);
						myText = resIndex;
						if ((resIndex != curPlanet) && (resIndex != totalStr))
							myText += ' (' + addDots (resInfo [resIndex] [4]) + ')';
						createCell (myTr, myText, "24%", "center", (resIndex != totalStr) ? "silver" : colors [3]);
						for (var i = 0; i < 3; i++)
							createCell (myTr, addDots (resInfo [resIndex] [i]), "19%", "right", "silver");
						createCell (myTr, addDots (resInfo [resIndex] [3]), "19%", "right", "silver");
					}
				span.appendChild (myTable);
			}
			else
			{
				span.style.marginLeft = "6px";
				span.style.color = "silver";
				var myImg2 = document.createElement ("img");
				myImg2.setAttribute ("src", titleImg);
				myImg2.style.verticalAlign = "middle";
				span.appendChild (myImg2);
				span.appendChild (createFontElement (": ", colors [3]));
				span.appendChild (createFontElement (rstrings [0], colors [0]));
				span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [0])));
				span.appendChild (document.createTextNode (", "));
				span.appendChild (createFontElement (rstrings [1], colors [1]));
				span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [1])));
				span.appendChild (document.createTextNode (", "));
				span.appendChild (createFontElement (rstrings [2], colors [2]));
				span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [2])));
				span.appendChild (document.createTextNode ("."));
				mySpan.style.cssFloat = "right";
				mySpan.style.styleFloat = "right";
				mySpan.style.marginRight = "28px";
				myImg.style.bottom = "0%";
				myImg.setAttribute ("src", openImg);
				span.appendChild (mySpan);
			}
			div.appendChild (span);
			if (below)
				document.getElementById ("inhalt").appendChild (div);
			else
			{
				var fleetDetails = document.querySelectorAll (".fleetDetails");
				fleetDetails [0].parentNode.insertBefore (div, fleetDetails [0]);
			}
			addEvent (mya, "click", redrawTable);
		}
		function redrawTable ()
		{
			while (div.hasChildNodes ())
				div.removeChild (div.firstChild);
			div.parentNode.removeChild (div);
			expanded = ! expanded;
			if (typeof GM_setValue == "function") // greasemonkey
				GM_setValue ("expanded", (expanded) ? "true" : "false");
			else if (typeof PRO_setValue == "function") // ie7pro
				PRO_setValue ("expanded", (expanded) ? "true" : "false");
			doTable ();
		}
		function getResName (resName)
		{
			function firstCap (theString)
			{
				return theString.charAt (0).toUpperCase () + theString.slice (1);
			}
			var myLi = document.getElementById (resName + "_box");
			var title = myLi.title;
			if (title.length == 0)
			{
				var unsafe;
				try
				{
					unsafe = unsafeWindow;
				}
				catch (e)
				{
					unsafe = window;
				}
				if (! unsafe.initAjaxResourcebox)
					return firstCap (resName);
				var savedParam;
				var originalReloadResources = unsafe.reloadResources;
				unsafe.reloadResources = function (parameter)
				{
					savedParam = parameter;
				};
				unsafe.initAjaxResourcebox ();
				unsafe.reloadResources = originalReloadResources;
				if (! savedParam)
					return firstCap (resName);
				title = savedParam [resName].tooltip;
			}
			title = (title.indexOf ("|") >= 0) ? (title.substring (0, title.indexOf ("|")).replace (/<[^>]+>/g, "")) : (title.split (/[<>]/) [2]);
			if (title.charAt (title.length - 1) != ":")
				title += ":";
			return title;
		}
		if (document.getElementById ("resourcesInFlight") != null)
			return;
		var resInfo = new Object;
		var directions = new Array ();
		var flightTypes = new Array ();
		var destinations = new Array ();
		var destinationNames = new Array ();
		var origins = new Array ();
		var originNames = new Array ();
		var myRes = new Array (0, 0, 0);
		var allFlights = document.querySelectorAll (".mission");
		for (var i = 0; i < allFlights.length; i++)
		{
			flightTypes [i] = allFlights [i].textContent;
			var matches = flightTypes [i].match (/\([^\)]+\)/);
			if (matches != null)
			{
				flightTypes [i] = flightTypes [i].replace (matches [0], "");
				directions [i] = "<";
			}
		}
		allFlights = document.querySelectorAll ("div.route a");
		for (var i = 0; i < allFlights.length; i++)
			directions [i] = ((allFlights [i].className.indexOf ("reverse") < 0) || (allFlights [i].className.indexOf ("fleet_icon_forward") >= 0)) ? ">" : "<";
		allFlights = document.querySelectorAll (".originCoords");
		for (var i = 0; i < allFlights.length; i++)
		{
			origins [i] = allFlights [i].firstChild.textContent;
			var mySpans = allFlights [i].parentNode.getElementsByTagName ("span");
			if (mySpans.length < 1)
				originNames [i] = "";
			else
			{
				var mySpan = mySpans [mySpans.length - 1];
				originNames [i] = (mySpan.title == "") ? mySpan.textContent.replace (/^\s+|\s+$/g, "") : mySpan.title.substring (mySpan.title.indexOf ("|") + 1);
			}
			if (typeof (directions [i]) == "undefined")
				directions [i] = ">";
		}
		allFlights = document.querySelectorAll (".destinationCoords");
		for (var i = 0; i < allFlights.length; i++)
			if (directions [i] == "<")
			{
				destinations [i] =  origins [i];
				destinationNames [i] = ((onlyToCurrent) ? "=>" : "+") + originNames [i].replace (/^\([^\)]+\) /, "");
			}
			else
			{
				destinations [i] =  allFlights [i].firstChild.textContent;
				var mySpans = allFlights [i].parentNode.getElementsByTagName ("span");
				if (mySpans.length < 2)
					destinationNames [i] = "";
				else
				{
					var mySpan = mySpans [mySpans.length - 2];
					var destName = (mySpan.title == "") ? mySpan.textContent.replace (/^\s+|\s+$/g, "") : mySpan.title.substring (mySpan.title.indexOf ("|") + 1);
					destinationNames [i] = ((onlyToCurrent) ? "=>" : "+") + destName.replace (/^\([^\)]+\) /, "");
				}
			}
		var flightCargo = new Object;
		allFlights = document.querySelectorAll (".fleetinfo");
		if (allFlights.length > 0)
		{
			for (var i = 0; i < allFlights.length; i++)
			{
				var trs = allFlights [i].getElementsByTagName ("tr");
				var any = false;
				var shipInfos = trs.length;
				if (trs [shipInfos - 1].id == "freeSpace")
					shipInfos--;
				for (var j = 0; j < 3; j++)
				{
					myRes [j] = parseInt (trs [shipInfos - 3 + j].getElementsByTagName ("td") [1].textContent.replace (/\D+/gi, ""));
					if (myRes [j] > 0)
						any = true;
				}
				flightCargo [i] = new Array (myRes [0], myRes [1], myRes [2]);
				var type = directions [i] + flightTypes [i];
				if (resInfo [type])
				{
					for (var j = 0; j < 3; j++)
						resInfo [type] [j] += myRes [j];
					if (any)
						resInfo [type] [4] += 1;
				}
				else
					resInfo [type] = new Array (myRes [0], myRes [1], myRes [2], 0, (any) ? 1 : 0);
			}
		}
		else
		{
			allFlights = document.querySelectorAll (".anti_fleetDetails");
			for (var i = 0; i < allFlights.length; i++)
			{
				var trs = allFlights [i].textContent.split (/\n/);
				var any = false;
				var shipInfos = trs.length;
				if (trs [shipInfos - 1].id == "freeSpace")
					shipInfos--;
				for (var j = 0; j < 3; j++)
				{
					myRes [j] = parseInt (trs [shipInfos - 3 + j].replace (/\D+/gi, ""));
					if (myRes [j] > 0)
						any = true;
				}
				flightCargo [i] = new Array (myRes [0], myRes [1], myRes [2]);
				var type = directions [i] + flightTypes [i];
				if (resInfo [type])
				{
					for (var j = 0; j < 3; j++)
						resInfo [type] [j] += myRes [j];
					if (any)
						resInfo [type] [4] += 1;
				}
				else
					resInfo [type] = new Array (myRes [0], myRes [1], myRes [2], 0, (any) ? 1 : 0);
			}
		}
		var rstrings = ["", "", ""];
		rstrings [0] = getResName ("metal");
		rstrings [1] = getResName ("crystal");
		rstrings [2] = getResName ("deuterium");
		var metaTag = document.getElementsByName ("ogame-planet-name");
		var curPlanetName = (metaTag && metaTag.length > 0) ? metaTag [0].content : document.getElementById ("selectedPlanetName").textContent;
		curPlanetName = curPlanetName.replace (/^\([^\)]+\) /, "");
		curPlanet = ((onlyToCurrent) ? "=>" : "+") + curPlanetName;
		allFlights = document.querySelectorAll (".planet-koords");
		if (allFlights.length == 1)
			curPlanetCoords = allFlights [0].textContent;
		else
		{
			for (var i = 0; i < allFlights.length; i++)
				if ((allFlights [i].parentNode.className.indexOf (" active ") >= 0) ||
				    (allFlights [i].className.indexOf ("_active") >= 0))
				{
					curPlanetCoords = allFlights [i].textContent;
					break;
				}
		}
		resInfo [totalStr]  = new Array (0, 0, 0, 0, 0);
		resInfo [curPlanet] = new Array (0, 0, 0, 0, 0);
		toPlanet = new Array (0, 0, 0);
		for (var i = 0; i < destinations.length; i++)
			if ((destinations [i] == curPlanetCoords) && (destinationNames [i] == curPlanet))
				for (var j = 0; j < 3; j++)
					toPlanet [j] += flightCargo [i] [j];
		planetRes [0] = parseInt (document.getElementById ("resources_metal").textContent.replace (/\D+/gi, ""));
		planetRes [1] = parseInt (document.getElementById ("resources_crystal").textContent.replace (/\D+/gi, ""));
		planetRes [2] = parseInt (document.getElementById ("resources_deuterium").textContent.replace (/\D+/gi, ""));
		for (var resIndex in resInfo)
			resInfo [resIndex] [3] = 0;
		for (var resIndex in resInfo)
			for (var i = 0; i < 3; i++)
			{
				if (resIndex == curPlanet)
					resInfo [curPlanet] [i] = ((onlyToCurrent) ? toPlanet [i] : resInfo [totalStr] [i]) + planetRes [i];
				else if (resIndex != totalStr)
					resInfo [totalStr] [i] += resInfo [resIndex] [i];
				resInfo [resIndex] [3] += resInfo [resIndex] [i];
			}
		if (resInfo [totalStr] [3] > 0)
		{
			div = document.createElement ("div");
			div.setAttribute ("id", "resourcesInFlight");
			div.className = "fleetDetails detailsOpened";
			div.style.height = "auto";
			div.style.fontWeight = "bold";
			div.style.lineHeight = "18px";
			doTable ();
		}
	}
}) ();
