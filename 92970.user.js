// ==UserScript==
// @name           OGame Redesign Recursos en Vuelo [Mod]
// @description    Displays how many resources are in flight on the overview page
// @namespace      Vesselin (mod by Danix)
// @version        1.21
// @date           2010-09-13
// @author         Vesselin Bontchev (mod by Danix)
// @include        http://*.ogame.*/game/index.php?page=movement*
// @include        http://*.ogame.*/game/index.php?page=eventList*
// ==/UserScript==

(function ()
{
	// Settings:
	const colors = ["gray", "deepskyblue", "lime", "yellow"];	// MetalColor, CrystalColor, DeuteriumColor, TitleColor
	const below = false;
	const onlyToCurrent = true;
	const inEventList = true;
	// You might want to translate these two in your own language:
	const totalStr = "Total:";
	const titleStr = "RECURSOS EN VUELO > ";
	// Code:
	if (inEventList && (document.location.href.indexOf ('/game/index.php?page=eventList') >= 0))
	{
		var $;
		try
		{
			$ = unsafeWindow.$;
		}
		catch (e)
		{
			$ = window.$;
		}
		var metal = 0;
		var crystal = 0;
		var deuterium = 0;
		var metalName = "";
		var crystalName = "";
		var deuteriumName = "";
		var numURLs = 0;
		var urls = [];
		$ ("#eventContent .eventFleet").each (function ()
		{
			var eventFleet = $ (this);
			var url = eventFleet.find (".detailsFleet a").eq (0).attr ("rel");
			if ((eventFleet.find (".detailsFleet a span").eq (0).attr ("class") != "icon_movement") ||
			    (eventFleet.find (".missionFleet img").eq (0).attr ("src").indexOf ("stationieren") != -1))
			{
				urls.push (url);
				numURLs++;
			}
		});
		function doRequest (url)
		{
			$.ajax (
			{
				dataType: "html",
				cache: false,
				url: url,
				success: function (data)
				{
					var tooltip_th = data.replace (/\n/g, "").split ("<th");
					if (tooltip_th [2])
					{
						var tooltip_td = tooltip_th [2].split ("<td");
						metal     += parseInt (tooltip_td [2].match (/>([\d.]+)</) [1].replace (/\./g, ""));
						crystal   += parseInt (tooltip_td [4].match (/>([\d.]+)</) [1].replace (/\./g, ""));
						deuterium += parseInt (tooltip_td [6].match (/>([\d.]+)</) [1].replace (/\./g, ""));
						if (metalName == "")
						{
							metalName     = tooltip_td [1].match (/>(.+)</) [1];
							crystalName   = tooltip_td [3].match (/>(.+)</) [1];
							deuteriumName = tooltip_td [5].match (/>(.+)</) [1];
						}
					}
				},
				complete: function ()
				{
					function addDots (n)
					{
						n += '';
						var rgx = /(\d+)(\d{3})/;
						while (rgx.test (n))
							n = n.replace (rgx, '$1' + '.' + '$2');
						return n;
					}
					numURLs--;
					if ((numURLs <= 0) && (metal + crystal + deuterium > 0))
					{
						var myText =
							'<div id="resourcesInFlight" style="text-align: left; margin-left: 40px;">' +
								'<font color="' + colors [3] + '">' + titleStr      + "</font>" +
								'<font color="' + colors [0] + '">' + metalName     + "</font> " + addDots (metal)     + ", " +
								'<font color="' + colors [1] + '">' + crystalName   + "</font> " + addDots (crystal)   + ", " +
								'<font color="' + colors [2] + '">' + deuteriumName + "</font> " + addDots (deuterium) + "."  +
							"</div>";
						$ (myText).insertBefore ($ ("#eventContent div").eq (0));
					}
				}
			});
		}
		for (var i in urls)
			doRequest (urls [i]);
	}
	else if (document.location.href.indexOf ('/game/index.php?page=movement') >= 0)
	{
		var expanded;
		if (typeof GM_setValue == "function") // greasemonkey
			expanded = GM_getValue ("expanded", false);
		else if (typeof PRO_setValue == "function") // ie7pro
			expanded = PRO_getValue ("expanded", false);
		else
			expanded = below;
		var div;
		var planetRes = [0, 0, 0];
		var curPlanet = "";
		var curPlanetCoords = "";
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
				myTd.appendChild (createFontElement (text, color));
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
			mya.setAttribute ("href", "#");
			var myImg = document.createElement ("img");
			myImg.style.position = "absolute";
			mya.appendChild (myImg);
			mySpan.appendChild (mya);
			if (expanded)
			{
				planetRes [0] = parseInt (document.getElementById ("resources_metal").innerHTML.replace (/\D+/gi, ""));
				planetRes [1] = parseInt (document.getElementById ("resources_crystal").innerHTML.replace (/\D+/gi, ""));
				planetRes [2] = parseInt (document.getElementById ("resources_deuterium").innerHTML.replace (/\D+/gi, ""));
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
				createCell (myTr, titleStr, "24%", "center", colors [3]);
				for (var i = 0; i < 3; i++)
					createCell (myTr, rstrings [i], "19%", "center", colors [i]);
				createCell (myTr, totalStr, "19%", "center", colors [3]);
				myImg.style.left = "96%";
				myImg.style.top = "0%";
				myImg.setAttribute ("src", "img/layout/fleetCloseAll.gif");
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
				span.appendChild (createFontElement (titleStr, colors [3]));
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
				myImg.setAttribute ("src", "img/layout/fleetOpenAll.gif");
				span.appendChild (mySpan);
			}
			div.appendChild (span);
			if (below)
				document.getElementById ("inhalt").appendChild (div);
			else
			{
				var fleetDetails = document.getElementsByClassName ("fleetDetails");
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
				GM_setValue ("expanded", expanded);
			else if (typeof PRO_setValue == "function") // ie7pro
				PRO_setValue ("expanded", expanded);
			doTable ();
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
		var allFlights = document.getElementsByClassName ("mission");
		for (var i = 0; i < allFlights.length; i++)
		{
			flightTypes [i] = allFlights [i].innerHTML;
			var matches = flightTypes [i].match (/\(.+\)/);
			if (matches != null)
			{
				flightTypes [i] = flightTypes [i].replace (matches [0], "");
				directions [i] = "<";
			}
		}
		allFlights = document.getElementsByClassName ("tipsTitleArrowCloseFleet");
		for (var i = 0; i < allFlights.length; i++)
			directions [i] = (allFlights [i].className.indexOf ("reverse") > -1) ? "<" : ">";
		allFlights = document.getElementsByClassName ("originCoords tipsStandard");
		for (var i = 0; i < allFlights.length; i++)
		{
			origins [i] = allFlights [i].firstChild.innerHTML;
			originNames [i] = allFlights [i].parentNode.getElementsByTagName ("span") [1].innerHTML;
			if (typeof (directions [i]) == "undefined")
				directions [i] = ">";
		}
		allFlights = document.getElementsByClassName ("destinationCoords tipsStandard");
		for (var i = 0; i < allFlights.length; i++)
			if (directions [i] == "<")
			{
				destinations [i] =  origins [i];
				destinationNames [i] = ((onlyToCurrent) ? "=>" : "+") + originNames [i];
			}
			else
			{
				destinations [i] =  allFlights [i].firstChild.innerHTML;
				destinationNames [i] = ((onlyToCurrent) ? "=>" : "+") + allFlights [i].parentNode.getElementsByTagName ("span") [0].innerHTML;
			}
		var flightCargo = new Object;
		allFlights = document.getElementsByClassName ("fleetinfo");
		if (allFlights.length > 0)
		{
			for (var i = 0; i < allFlights.length; i++)
			{
				var trs = allFlights [i].getElementsByTagName ("tr");
				var any = false;
				for (var j = 0; j < 3; j++)
				{
					myRes [j] = parseInt (trs [trs.length - 3 + j].getElementsByTagName ("td") [1].innerHTML.replace (/\D+/gi, ""));
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
			allFlights = document.getElementsByClassName ("anti_fleetDetails");
			for (var i = 0; i < allFlights.length; i++)
			{
				var trs = allFlights [i].textContent.split (/\n/);
				var any = false;
				for (var j = 0; j < 3; j++)
				{
					myRes [j] = parseInt (trs [trs.length - 3 + j].replace (/\D+/gi, ""));
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
		var li = document.getElementById ("metal_box");
		var rstrings = ["", "", ""];
		rstrings [0] = li.getAttribute ("title").split (/[<>]/) [2];
		li = document.getElementById ("crystal_box");
		rstrings [1] = li.getAttribute ("title").split (/[<>]/) [2];
		li = document.getElementById ("deuterium_box");
		rstrings [2] = li.getAttribute ("title").split (/[<>]/) [2];
		curPlanet = ((onlyToCurrent) ? "=>" : "+") + document.getElementById ("selectedPlanetName").innerHTML;
		allFlights = document.getElementsByClassName ("planet-koords");
		if (allFlights.length == 1)
			curPlanetCoords = allFlights [0].innerHTML;
		else
		{
			for (var i = 0; i < allFlights.length; i++)
				if (allFlights [i].parentNode.className.indexOf (" active ") != -1)
				{
					curPlanetCoords = allFlights [i].innerHTML;
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
		planetRes [0] = parseInt (document.getElementById ("resources_metal").innerHTML.replace (/\D+/gi, ""));
		planetRes [1] = parseInt (document.getElementById ("resources_crystal").innerHTML.replace (/\D+/gi, ""));
		planetRes [2] = parseInt (document.getElementById ("resources_deuterium").innerHTML.replace (/\D+/gi, ""));
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
}
) ();
