// ==UserScript==
// @name           Die Staemme - Dorfübersicht sortierer
// @namespace      Die Staemme
// @include        http://*.die-staemme.de/*
// @exclude	   http://forum.die-staemme.de/*
// @author	   Marc H. (Salandora)
// @description	   Version 1.02 | Im Browsergame "Die Staemme" kann mit diesem Script die Übersichtsseite sortiert werden. 
// ==/UserScript==

var Dorfinfos = new Array();
var Styleinfos = new Array();
var anzeige = new Array();

if(window.location.href.indexOf("game.php") >= 0)
{
	if (location.href.match(/screen=settings&mode=settings/))
	{
		var vorh = "";
		var scripts = document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].getElementsByTagName("th");
		for (var i = 1; i < scripts.length; i++)
		{
			var zelle = scripts[i];
			var script_name = zelle.getElementsByTagName("a")[0].innerHTML.split(" <span")[0];
			if(vorh == "" && script_name.indexOf("DS - Speicherstände") != -1)
				vorh = "vorhanden";
		}
		GM_setValue("Dorfübersicht-Speicherstände", vorh);
		if (vorh == "vorhanden")
		{
			var scripts = document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].getElementsByTagName("tr");
			for (var i = 1; i < scripts.length; i++)
			{
				var zelle = scripts[i];
				if(zelle.innerHTML.indexOf("DS - Speicherstände") != -1)
				{
					zelle = scripts[i+1];
					var linie = zelle.getElementsByTagName("td")[1].innerHTML.split('<br>');
					for(var j = 0; j < linie.length; j++)
					{
						var text = linie[j].replace(/<.*?>/g, '').split(':');
						text[0] = text[0].split(' ')[0];
						text[1] = text[1].split(' ')[0];

						if(text[0] == "Kompakt")
						{
							GM_setValue("Dorfübersicht-Speicherstände-Kompakt", text[1]);
						}
						if(text[0] == "Bauernhof")
						{
							GM_setValue("Dorfübersicht-Speicherstände-Bauernhof", text[1]);
						}
					}

					break;
				}
			}
		}
	}
	if (GM_getValue("Dorfübersicht-Speicherstände") == undefined)
	{
		if(confirm("Die Dorfübersicht ist jetzt installiert. Klicke OK um zur Einstellungsseite zu gelangen. Dort wird geprüft ob du Zombie74's DS - Speicherstände benutzt."))
		{
			document.location.href = document.location.href.split('&')[0] + "&screen=settings&mode=settings&einstellung=speicher";
		}
	}
	if (location.href.match(/screen=overview_villages/))
	{
		SammelInformationen();
		ErstereiheAnpassen();

		if(GM_getValue("Dorfübersicht-Gespeicherte-Sortierung", "") != "")
		{
			var gespeichertesortierung = GM_getValue("Dorfübersicht-Gespeicherte-Sortierung", "").split(',');
			if (gespeichertesortierung[0].indexOf("Aufwaerts") != -1)
				SortAufwaerts(parseInt(gespeichertesortierung[1]));
			else
				SortAbwaerts(parseInt(gespeichertesortierung[1]));
		}
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

function SammelInformationen()
{
	var main = document.getElementsByClassName("main");
	var vis = getVis();
	var rows = vis.getElementsByTagName("tr");

	var j = 0;
	for (var i = 1; i < rows.length; i++)
	{
		var tds = rows[i].getElementsByTagName("td");
		if ( tds[0] == undefined )
			continue;

		var a = tds[0].getElementsByTagName("a")[0];
		var villageID = a.href.split("&")[0].split("=")[1];

		Dorfinfos[j] = new Array();
		Styleinfos[j] = new Array();
		anzeige[j] = j;
		for (var k = 0; k < tds.length; k++)
		{
			var td = tds[k];
			
			Dorfinfos[j][k] = td.innerHTML;
			Styleinfos[j][k] = td.getAttribute("style");
		}
		j++;
	}
}

function NeueTabelle()
{
	var vis = getVis();
	var rows = vis.getElementsByTagName("tr");

	var i = 0;
	for (var j = 1; j < rows.length; j++)
	{
		var row = rows[j];
		var tds = row.getElementsByTagName("td");
		for (var k = 0; k < tds.length; k++)
		{
			var td = tds[k];
			if (td == undefined)
			{
				GM_log("Neue Tabelle j: " + j);
				GM_log("Neue Tabelle k: " + k);
				continue;
			}

			td.setAttribute("style", Styleinfos[anzeige[i]][k]);
			td.innerHTML = Dorfinfos[anzeige[i]][k];
		}
		i++;
	}
}

function ErstereiheAnpassen()
{
	var vis = getVis();
	var rows = vis.getElementsByTagName("tr");

	var th = rows[0].getElementsByTagName("th");
	for(var i = 0; i < th.length; i++)
	{
		CreateLinks(th[i], i);
	}	
}

function CreateLinks(th, id)
{
	var aufwaerts = document.createElement("a");
	aufwaerts.href="#";
	aufwaerts.addEventListener("click", function() { SortAufwaerts(id); } , false);
	aufwaerts.innerHTML = '<br>&uArr;';

	var abwaerts = document.createElement("a");
	abwaerts.href="#";
	abwaerts.addEventListener("click", function() { SortAbwaerts(id); }, false);
	abwaerts.innerHTML = '&dArr;';

	th.appendChild(aufwaerts);
	th.appendChild(document.createTextNode("/"));
	th.appendChild(abwaerts);
}

function SortAufwaerts(i)
{
	GM_setValue("Dorfübersicht-Gespeicherte-Sortierung", "Aufwaerts," + i);

	if (GM_getValue("Dorfübersicht-Speicherstände") == "vorhanden")
	{
		if (GM_getValue("Dorfübersicht-Speicherstände-Bauernhof") == "aus")
			if (i >= 12)
				i = i - 1;

		if (GM_getValue("Dorfübersicht-Speicherstände-Kompakt") == "aus")
			if (i >= 10)
				i = i - 1;
	}

	var split = getSplitMethode(i);
	if (split == "Dorf")
	{
		var array = new Array();
		for (var j = 0; j < Dorfinfos.length; j++)
		{
			array[j] = new Array(j, j);
		}
		iSortAufwaerts(array);	
	}
	else if (split == "Rohstoffe")
	{
		var array = new Array();
		for (var j = 0; j < Dorfinfos.length; j++)
		{
			var arr = Dorfinfos[j];
			if (arr == null)
			{
				GM_log("SortAufwaerts Rohstoffe j: " + j);
				GM_log("SortAufwaerts Rohstoffe i: " + i);
				continue;
			}

			arr = arr[i];
			if(arr == null)
			{
				GM_log("SortAufwaerts Rohstoffe j: " + j);
				GM_log("SortAufwaerts Rohstoffe i: " + i);
				continue;
			};

			var ressourcen = Dorfinfos[j][i].replace(/<.+?>/g, '');
			while (ressourcen.indexOf('.') != -1)
				ressourcen = ressourcen.replace('.', '');
			
			ressourcen = ressourcen.split(' ');
			var holz = ressourcen[0];
			var lehm = ressourcen[1];
			var eisen = ressourcen[2];

			array[j] = new Array(j, parseInt(holz) + parseInt(lehm) + parseInt(eisen));
		}
		iSortAufwaerts(array);
	}
	else if (split == "Bauernhof")
	{
		var array = new Array();
		for (var j = 0; j < Dorfinfos.length; j++)
		{
			var arr = Dorfinfos[j];
			if (arr == null)
			{
				GM_log("SortAufwaerts Bauernhof j: " + j);
				GM_log("SortAufwaerts Bauernhof i: " + i);
				continue;
			}

			arr = arr[i];
			if(arr == null)
			{
				GM_log("SortAufwaerts Bauernhof j: " + j);
				GM_log("SortAufwaerts Bauernhof i: " + i);
				continue;
			}

			var split = Dorfinfos[j][i].replace(/<.+?>/g, '');
			while(split.indexOf('.') != -1)
				split = split.replace('.', '');

			split = split.split('/');
			array[j] = new Array(j, parseInt(split[1]) - parseInt(split[0]));
		}
		iSortAufwaerts(array);	
	}
	else
	{
		var array = new Array();
		for (var j = 0; j < Dorfinfos.length; j++)
		{
			var arr = Dorfinfos[j];
			if (arr == null)
				continue;

			arr = arr[i];
			if(arr == null)
				continue;

			var pkt = Dorfinfos[j][i].replace(/<.+?>/g, '');
			while(pkt.indexOf('.') != -1)
				pkt = pkt.replace('.', '');

			array[j] = new Array(j, parseInt(pkt));
		}
		iSortAufwaerts(array);	
	}

	NeueTabelle();
}
function SortAbwaerts(i)
{
	GM_setValue("Dorfübersicht-Gespeicherte-Sortierung", "Abwaerts," + i);

	if (GM_getValue("Dorfübersicht-Speicherstände") == "vorhanden")
	{
		if (GM_getValue("Dorfübersicht-Speicherstände-Bauernhof") == "aus")
			if (i >= 12)
				i = i - 1;

		if (GM_getValue("Dorfübersicht-Speicherstände-Kompakt") == "aus")
			if (i >= 10)
				i = i - 1;
	}

	var split = getSplitMethode(i);
	if (split == "Dorf")
	{
		var array = new Array();
		for (var j = 0; j < Dorfinfos.length; j++)
		{
			array[j] = new Array(j, j);
		}
		iSortAbwaerts(array);
	}
	else if (split == "Rohstoffe")
	{
		var array = new Array();
		for (var j = 0; j < Dorfinfos.length; j++)
		{
			var arr = Dorfinfos[j];
			if (arr == null)
				continue;

			arr = arr[i];
			if(arr == null)
				continue;

			var ressourcen = Dorfinfos[j][i].replace(/<.+?>/g, '');
			while (ressourcen.indexOf('.') != -1)
				ressourcen = ressourcen.replace('.', '');
			
			ressourcen = ressourcen.split(' ');
			var holz = ressourcen[0];
			var lehm = ressourcen[1];
			var eisen = ressourcen[2];
			
			array[j] = new Array(j, parseInt(holz) + parseInt(lehm) + parseInt(eisen));
		}
		iSortAbwaerts(array);
	}
	else if (split == "Bauernhof")
	{
		var array = new Array();
		for (var j = 0; j < Dorfinfos.length; j++)
		{
			
			var arr = Dorfinfos[j];
			if (arr == null)
				continue;

			arr = arr[i];
			if(arr == null)
				continue;

			var split = Dorfinfos[j][i].replace(/<.+?>/g, '');
			while(split.indexOf('.') != -1)
				split = split.replace('.', '');

			split = split.split('/');
			array[j] = new Array(j, parseInt(split[1]) - parseInt(split[0]));
		}
		iSortAbwaerts(array);
	}
	else
	{
		var array = new Array();
		for (var j = 0; j < Dorfinfos.length; j++)
		{
			var arr = Dorfinfos[j];
			if (arr == null)
				continue;

			arr = arr[i];
			if(arr == null)
				continue;

			
			var pkt = Dorfinfos[j][i].replace(/<.+?>/g, '');
			while(pkt.indexOf('.') != -1)
				pkt = pkt.replace('.', '');

			array[j] = new Array(j, parseInt(pkt));
		}
		iSortAbwaerts(array);	
	}

	NeueTabelle();	
}

function getSplitMethode(i)
{
	var vis = getVis();
	var rows = vis.getElementsByTagName("tr");

	var td = rows[1].getElementsByTagName("td")[i].innerHTML.replace(/<.+?>/g, '');

	var dorf = /[a-zA-Z]+/g;
	var rohstoffe = /\d.*?\s\d.*?\s\d.*?/;
	var bauernhof = /\d.*?\/\d.*?/;

	if (td.match(dorf))
		return "Dorf";
	else if (td.match(rohstoffe))
		return "Rohstoffe";
	else if (td.match(bauernhof))
		return "Bauernhof";
}

function iSortAufwaerts(array)
{
	for (var i = 0; i < 2; i++)
	{
		for (var j = 0; j < array.length-1; j++)
		{
			if (array[j][1] < array[j + 1][1])
			{
				var save = array[j];
				array[j] = array[j + 1];
				array[j + 1] = save;
				j = -1;
			}
		}
	}

	for (var i = 0; i < array.length; i++)
	{
		anzeige[i] = array[i][0];
	}
}

function iSortAbwaerts(array)
{
	for (var i = 0; i < 2; i++)
	{
		for (var j = 0; j < array.length-1; j++)
		{
			if (array[j][1] > array[j + 1][1])
			{
				var save = array[j];
				array[j] = array[j + 1];
				array[j + 1] = save;
				j = -1;
			}
		}
	}

	for (var i = 0; i < array.length; i++)
	{
		anzeige[i] = array[i][0];
	}
}