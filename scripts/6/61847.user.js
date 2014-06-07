// ==UserScript==
// @name           Die Staemme - TWplus Simple attack planer
// @namespace      Die Staemme
// @author	   Marc H. (Salandora)
// @description    Dieses Script speichert die langsamste Einheit eines Dorfes(muss man auswählen) und fügt diese dann bei Attack planer von TWplus ein.
// @include        http://*.die-staemme.de/*screen=overview_villages*
// @include        http://*.twplus.org/attack/simple/?t_x=*&t_y=*&p=*

// ==/UserScript==

// =============================================================
//
//   Weitergabe oder Änderungen nur mit zustimmung des Authors!
//
// =============================================================

var l = 0;
var einheiten = new Array();
einheiten[l++] = "spear";
einheiten[l++] = "sword";
einheiten[l++] = "axe";
einheiten[l++] = "archer";
einheiten[l++] = "spy";
einheiten[l++] = "light";
einheiten[l++] = "marcher";
einheiten[l++] = "heavy";
einheiten[l++] = "ram";
einheiten[l++] = "catapult";
einheiten[l++] = "knight";
einheiten[l++] = "snob";


var welt = location.href.split('.')[0].replace("http://", "");

if (location.href.match(/screen=overview_villages/))
{
	if (document.getElementById("menu_row").innerHTML.match(/screen=memo/))
		window.setTimeout(function(){ aendereLinksBeiDoerfernPA(); }, 1000);
	else
		window.setTimeout(function(){ aendereLinksBeiDoerfern(); }, 1000);

}
else if (location.href.match(/t_x=.+?&t_y=.+?&p=.+?/))
{
	window.setTimeout(function(){ doerferBeiTWpluseinfuegen(); }, 3000);
}

function getVis()
{
	var main = document.getElementsByClassName("main");
	var vis = main[main.length-1].getElementsByClassName("vis");

	if(vis.length > 1)
		return vis[vis.length-2];
	
	return vis[0];
}

function localisiereEinheitenSpalten()
{
	var vis = getVis();
	var spalten = new Object();
	var i = 0;

	var dorfzeile = vis.getElementsByTagName("tr")[0];
	var doerferspalten = dorfzeile.getElementsByTagName("th");
	for (var j = 0; j < doerferspalten.length; j++)
	{
		var dorfspalte = doerferspalten[j];
		for (var k = 0; k < einheiten.length; k++)
		{
			if (dorfspalte.innerHTML.indexOf("/unit_" + einheiten[k]) != -1)
				spalten[einheiten[k]] = j;
		}
	}

	return spalten;
}

function aendereLinksBeiDoerfernPA()
{
	var vis = getVis();
	var spalten = localisiereEinheitenSpalten();

	var doerferzeilen = vis.getElementsByTagName("tr");
	for (var i = 1; i < doerferzeilen.length; i++)
	{
		var dorfspalten = doerferzeilen[i].getElementsByTagName("td");
		var villageid = dorfspalten[0].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];

		for (var j = 0; j < einheiten.length; j++)
		{
			if ( spalten[einheiten[j]] == undefined)
				continue;

			var dorfspalte = dorfspalten[spalten[einheiten[j]]];
			if (dorfspalte.getAttribute("class") != undefined && dorfspalte.getAttribute("class").indexOf("hidden") != -1)
				continue;

			var unit = einheiten[j];

			var link = createLink(dorfspalte.innerHTML, villageid, unit);
			link.setAttribute("id", unit + villageid);
			if (GM_getValue("Slowestunit_" + villageid + "_" + welt, "") == unit)
				link.setAttribute("style", "border:2px solid #F00");

			dorfspalte.innerHTML = "";
			dorfspalte.appendChild(link);
		}

		var td = document.createElement("td");
		td.appendChild(createLoeschLink(villageid));

		doerferzeilen[i].appendChild(td);
	}
}

function aendereLinksBeiDoerfern()
{
	var vis = getVis();

	var doerferzeilen = vis.getElementsByTagName("tr");
	for (var i = 1; i < doerferzeilen.length; i++)
	{
		var dorfspalten = doerferzeilen[i].getElementsByTagName("td");
		var dorfspaltenull = dorfspalten[0];
		if ( dorfspaltenull == undefined)
			continue;

		var dorflink = dorfspaltenull.getElementsByTagName("a")[0];
		if(dorflink == undefined)
			continue;

		var villageid = dorflink.href.split("village=")[1].split("&")[0];

		for (var j = 0; j < einheiten.length; j++)
		{
			var dorfspalte = document.createElement("td");
			doerferzeilen[i].appendChild(dorfspalte);

			var unit = einheiten[j];

			var innerhtml = "<img src='graphic/unit/unit_" + unit + ".png?1' id='"+ unit + villageid + "'";
			if (GM_getValue("Slowestunit_" + villageid + "_" + welt, "") == unit)
				innerhtml += " style='border:2px solid #F00'";
			innerhtml += ">";

			dorfspalte.appendChild(createLink(innerhtml, villageid, unit));
		}

		var td = document.createElement("td");
		td.appendChild(createLoeschLink(villageid));

		doerferzeilen[i].appendChild(td);
	}
}

function modifyBorder(unit, villageid)
{
	for (var i = 0; i < einheiten.length; i++)
	{
		document.getElementById(einheiten[i]+villageid).setAttribute("style", "");
	}

	if (unit != "")
		document.getElementById(unit+villageid).setAttribute("style", "border:2px solid #F00");
}

function createLink(innerhtml, villageid,  unit)
{
	var link = document.createElement("a");
	link.innerHTML = innerhtml;
	link.href = "javascript:;";
	link.addEventListener("click", function(){ GM_setValue("Slowestunit_" + villageid + "_" + welt, unit); modifyBorder(unit, villageid); }, false);

	return link;
}

function createLoeschLink(villageid)
{
	var link = document.createElement("a");
	link.innerHTML = "Löschen";
	link.href = "javascript:;";
	link.addEventListener("click", function(){ modifyBorder("", villageid); if(GM_deleteValue) { GM_deleteValue("Slowestunit_" + villageid + "_" + welt); } else { GM_setValue("Slowestunit_" + villageid + "_" + welt, ""); } }, true);
	
	return link;
}

function doerferBeiTWpluseinfuegen()
{
	var table = document.getElementById("villagelist");
	var zeilen = table.getElementsByTagName("tr");
	for (var i = 0; i < zeilen.length; i++)
	{
		var spalten = zeilen[i].getElementsByTagName("td");
		
		var dorfid = /\/file\/village\/(\d*)\//.exec(spalten[0].getElementsByTagName("a")[0].href)[1];
		var einheit = GM_getValue("Slowestunit_" + dorfid + "_" + welt, "");

		if (einheit == "")
			continue;

		unsafeWindow.selectOrigin(dorfid, einheit);
	}
}