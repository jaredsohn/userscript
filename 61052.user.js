// ==UserScript==
// @name           Die Stämme - Laufzeit der Händler
// @namespace      Die Staemme
// @author	   Marc H. (Salandora)
// @description	   Diese Script zeigt in der Dorfübersicht die laufzeit der Händler zum aktuellen Dorf
// @include        http://de*.die-staemme.de/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==

// Hier die Händlergeschwindigkeit deiner Welt eintragen
var haendlergeschwindigkeit = 6;

if (location.href.match(/screen=overview_villages/))
{
	// aktuelle position
	var pos = getPosition();

	var vis = getVis();
	var rows = vis.getElementsByTagName("tr");

	var ths = rows[0].getElementsByTagName("th");
	var th = document.createElement("th");
	th.setAttribute("style", ths[0].getAttribute("style"));
	th.innerHTML = "Entfernung";
	rows[0].insertBefore(th, ths[2]);

	for (var i = 1; i < rows.length; i++)
	{
		var row = rows[i];
		var tds = row.getElementsByTagName("td");

		var link = row.getElementsByTagName("a")[0];
		var dorfposition = splitPosition(link.innerHTML);
		var dorfid = getDorfid(link);

		var dorfpos = { x: parseInt(dorfposition[0]), y: parseInt(dorfposition[1]) };

		var td = document.createElement("td");
		td.setAttribute("style", link.parentNode.getAttribute("style"));

		var link = document.createElement("a");
		link.href = "game.php?village=" + dorfid + "&screen=overview_villages";
		link.innerHTML = getEntfernung(pos, dorfpos);
		td.appendChild(link);

		if ( link.innerHTML.indexOf("NaN") == -1)
			row.insertBefore(td, tds[2]);
	}
}

function getVis()
{
	var main = document.getElementsByClassName("main");
	var vis = main[main.length-1].getElementsByClassName("vis");

	if(vis.length > 1)
		return vis[vis.length-2];
	
	return vis[0];
}


function getPosition()
{
	var postds = document.getElementsByClassName("navi-border")[1].getElementsByTagName("td");
	var postd = postds[postds.length - 1];

	var position = splitPosition(postd.innerHTML);

	return { x: parseInt(position[0]), y: parseInt(position[1]) };
}

function splitPosition(text)
{
	return text.substring(text.indexOf("(")+1, text.indexOf(")")).split("|");
}

function getEntfernung(position, dorfposition)
{
	var xoff = (position.x - dorfposition.x) * (position.x - dorfposition.x);
	var yoff = (position.y - dorfposition.y) * (position.y - dorfposition.y);

	var sqrt = Math.sqrt(xoff + yoff);

	var zeit = sqrt * haendlergeschwindigkeit;

	var sekunden = zeit * 60;
	var stunden = Math.floor(sekunden / (60 * 60));
	var minuten = Math.floor((sekunden / 60) - (stunden * 60));
	sekunden = Math.floor(sekunden % 60);

	if (minuten < 10)
		minuten = "0" + minuten;

	if (sekunden < 10)
		sekunden = "0" + sekunden;

	return stunden + "." + minuten + "." + sekunden;
}

function getDorfid(link)
{
	var split = link.href.split("village=")[1];
	split = split.split("&")[0];

	return split;
}