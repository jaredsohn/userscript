var metadata=<> 
// ==UserScript==
// @name           Bauliste
// @namespace      http://userscripts.org/scripts/show/94458
// @include        http://s*.*.ikariam.com/*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version        1.0t
// @updater:script http://userscripts.org/scripts/source/94458.user.js
// @updater:meta   http://userscripts.org/scripts/source/94458.meta.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

var languages = {
	de: {
		"titel": "Bauliste",
		"upgrade": "Ausbau vormerken",
		"upgrade2": "Bau vormerken",
		"delupgrade": "Vermerk löschen",
		"level": " St. ",
		"prod": "Stundenproduktion",
		"wood": "Bauholz: ",
		"wine": "Wein: ",
		"marble": "Marmor: ",
		"glas": "Kristallglas: ",
		"sulfur": "Schwefel: ",
		"cost": "Kosten:",
		"missing": "es fehlen",
		// Optionen
		"options": "Optionen",
		"settings_header": "Bauliste Einstellungen",
		"settings_position": "Position:",
		"settings_pos0": "Oben",
		"settings_pos1": "Original",
		"settings_pos2": "Unten",
		"settings_show": "Anzeigen in/auf",
		"settings_city": "Stadt:",
		"settings_foreigncity": "Fremde Stadt:",
		"settings_relatedCity": "Fremde Stadt - Militär:",
		"settings_upgrade": "Gebäudeansicht:",
		"settings_building": "Leere Bauplatz",
		"settings_transport": "Transportieren:",
		"settings_deployment": "Stationieren:",
		"settings_world": "Weltkarte:",
		"settings_island": "Insel:",
		"settings_mine": "Rohstoffquellen:",
		"settings_agora": "Agora:",
		"settings_spyMissions": "Spionieren:",
		"settings_tradeAdvisor": "Städteberater:",
		"settings_militaryAdvisor": "Militärberater:",
		"settings_researchAdvisor": "Forschungsberater:",
		"settings_diplomacyAdvisor": "Diplomatieberater:",
		"settings_highscore": "Highscore:",
		"settings_options": "Optionen:",
		"settings_premiumTrader": "Ambrosia Rohstoffe tauschen:",
		"saved": "Daten wurden lokal gespeichert.",
		"save": "Speichern!",
		// Gebäudenamen
		"alchemist": "Alchemistenturm",
		"academy": "Akademie",
		"palace": "Palast",
		"palaceColony": "Statthaltersitz",
		"townHall": "Rathaus",
		"museum": "Museum",
		"safehouse": "Versteck",
		"carpentering": "Zimmerei",
		"port": "Handelshafen",
		"barracks": "Kaserne",
		"warehouse": "Lagerhaus",
		"shipyard": "Kriegswerft",
		"vineyard": "Kelterei",
		"tavern": "Taverne",
		"wall": "Stadtmauer",
		"winegrower": "Winzerei",
		"embassy": "Botschaft",
		"branchOffice": "Kontor",
		"stonemason": "Steinmetz",
		"optician": "Optiker",
		"dump": "Halde",
		"workshop": "Erfinderwerkstatt",
		"forester": "Forsthaus",
		"glassblowing": "Glasbläserei",
		"temple": "Tempel",
		"architect": "Architekturbüro",
		"fireworker": "Feuerwerksplatz"
	},
	en: {
		"titel": "Buildlist",
		"upgrade": "Mark upgrade",
		"upgrade2": "Mark building",
		"delupgrade": "Remove mark",
		"level": " Lv. ",
		"prod": "Hourly production",	// Tooltip Text when hovering over the Ressource-Icons, for identifying the production values
		"wood": "Wood: ",
		"wine": "Wine: ",
		"marble": "Marble: ",
		"glas": "Crystal Glass: ",
		"sulfur": "Sulphur: ",
		"cost": "Cost:",
		"missing": "missing",
		// Options
		"options": "Optionen",
		"settings_header": "Buildlist Settings",
		"settings_position": "Position:",
		"settings_pos0": "Top",
		"settings_pos1": "Original",
		"settings_pos2": "Bottom",
		"settings_show": "Where to show",
		"settings_city": "City:",
		"settings_foreigncity": "Foreign city:",
		"settings_relatedCity": "Foreign city - military:",
		"settings_upgrade": "Building:",
		"settings_building": "Empty buildplace",
		"settings_transport": "Transport:",
		"settings_deployment": "Deployment:",
		"settings_world": "Worldmap:",
		"settings_island": "Island:",
		"settings_mine": "Ressource:",
		"settings_agora": "Island board:",
		"settings_spyMissions": "Espionage:",
		"settings_tradeAdvisor": "Trade advisor:",
		"settings_militaryAdvisor": "Military advisor:",
		"settings_researchAdvisor": "Research advisor:",
		"settings_diplomacyAdvisor": "Diplomacy advisor:",
		"settings_highscore": "Highscore:",
		"settings_options": "Options:",
		"settings_premiumTrader": "Premium trader:",
		"saved": "Data saved localy.",
		"save": "Save!",
		// Buildings
		"alchemist": "Alchemist's Tower",
		"academy": "Academy",
		"palace": "Palace",
		"palaceColony": "Governor's Residence",
		"townHall": "Town hall",
		"museum": "Museum",
		"safehouse": "Hideout",
		"carpentering": "Carpenter",
		"port": "Trading port",
		"barracks": "Barracks",
		"warehouse": "Warehouse",
		"shipyard": "Ship yard",
		"vineyard": "Wine press",
		"tavern": "Tavern",
		"wall": "Town wall",
		"winegrower": "Winegrower",
		"embassy": "Embassy",
		"branchOffice": "Trading post",
		"stonemason": "Stonemason",
		"optician": "Optician",
		"dump": "dumb",
		"workshop": "Workshop",
		"forester": "Forester's House",
		"glassblowing": "Glassblower",
		"temple": "Temple",
		"architect": "Architect's Office",
		"fireworker": "Firework Test Area"
	}
};

var href = document.location.href;
var server = getServer(href);
var lang = getLanguage(href);

// Update-Check
var update = new Updater(metadata,lang);
update.update();

var language = languages[lang];
if(language == null)
	language = languages['en'];

function getServer(href) {
	var server = href.replace(/........(\d+).*/,"$1");
	return server;
}

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
}

var page = getPage(href);
var store = server+"_"+lang;

var upsrc = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAkFBgcI/8QAKhAAAQQCAQMDBAIDAAAAAAAAAQIDBAUGBxEACBIUISITFTFRFyMlMjP/xAAXAQEBAQEAAAAAAAAAAAAAAAAGCAcJ/8QAIhEAAgMAAgICAwEAAAAAAAAAAgMBBAUGEgARFSEHExRB/9oADAMBAAIRAxEAPwDAb7jbf2rsrYmzNi53ld3kl3eZFLQiVkdnW1tXWpswIVLSQBwKWmpQAlKQAAAPcAddt7uewC37WpunYEHcGX5x/LGt15lZfcLOfQjHpyDXerqoJRaL4pVmYeEL8FD8LSPbqt+iM/yjT0fMJ7Gn9dbDGY2Bnc5DEWzY1/oUFJSpTdfbEgefP5BCkhXI46pH3JbwvcFla7YqNQa7z0ZHg67eVIyh1KkUPKG/8XHH25SjVe55Hk38ytRaAUOoBweLYOtxjlmxt8tanXluU9735Gtbditfq2azzJlS3VjV+TVWIIhIx/HC/ZSUMjtzY49+McLc4lyzb3uW2q+5Lcx5W7WDrPdgNt7mhFhklU0K/wAz8xS6BMIhU0OvYpZDRgoEdovcx3daM1Q5rvG9g2FtjdXk1g/QtZiHMosKavk1dLzTwbKyIlt07MxuXMgQ3ABH9c7wPmenXYG4OSYzLt4b9DVocmW0u0U1CiCNHY9YG/6kMnjw8fp88foj9dOi9bkfL6tdFZPIt9akLBS1p2b6lAC4ERFa/wBpdAGBiBHsXWIiPc+vsVW3PyBl10ZtTlm+mtRWFVClal9alqSILWC1/wBB9AERGBHuXWPr3PqZ8oVslQ1pneRYZjTMb7FDeluQ2bGJFmvQ2XZ6HFQY7xZbKIIUo8MFKiABys+5OiSNk5Bw+XGKh8x2/RNfXgefjH5/0/7Dnj9/np06YbCwXqaa1gC1r0ra1gAwAAsP19FgIxAiA+56iMQI+59RHufKD0DNOjfrpMlIRaYtCFlK0pXHr0tSxmAWEf4ADAx/kee2tEaC1rs3X8PNcxp12l7dTX35DpVHbYjoEeIG4cFgRT6eEx8iyx5L8CtfyPPs6dOqM43xrjljj+M9/H8R7nZtNjXOyqDGtYaQIzYw0EZmUzMkRTJFMzMzM+bFh4GFYx8x9jFyXvdRrMa52dTa1rDUBGxjDSRmZF9kZFJFP3MzPn//2Q%3D%3D";
var unsrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE2UlEQVQ4EV1VW2xUVRTd59x77p0p05aWIlUpr3a0MOVNFBM+wB+q0YQP2kDCQzGKUT/0i6gfjAnxQ38MH8ZAIiY8Els/EIFawDAiJgoqalIElAYftNPXvB/3cc7Z7jOlxHgzN3fOvnuvs/bae5/L4H9XXw9YPX2gGQM0r4Z6Ek5ToqlVgXKCkbGJ9kPD+ZkQTAJnSdAza/Nk/10YsN5+UGc7wE30JJ6NtDZvs4VezTg2ASpLhdWKrvp/yLJ3Kvfb5NFEfzmNFAP9RACmCdwHnAG7vb1pQzQ+58PmFrGcsQpWq2WmVXBvXxuEJdCxLJbJq2yY895acDD/kWEKSUADWgM0uzBidmNbbGvLklknRESLYqmqHGFBfWO9VQxsQI06aoecax/yhVAJzqE+wqyRu/Lj9sPFF2lHkzpjM8x+7nY3z+uMnkViHypUjsttFLG8X3HfURX2vc2Yx+zqEnDklqgrt+pQOtWyDuc2cCedlu91HC3vM1g1hkcAZj/5XOyKiLK456NiNuPCYUwLkZn6sbR+9SX/9yTU0oIkFWFoS/SxxjbRxxUurJR0GBVMTPwVbl513j/HjTjrn3b31HGIFzMq1AFy7SF6RaUdKZvndkW/vrwSEgSod98Bh/SyEyerVzI3vW6/ghMYgFAVhOgsvs9g1QBR8N5ygSSQaNkWQ4cDI6kgPx5qHqoH21bFBi51wLLFn4DXPwSIL4FYcS64URoJ90cYQqmglJK48eo66OLnlkIcFS4rEaDgjE8N+y8UMvJwk8M4sdW5Cam4xraH19R9eXkZJExbpW5Nt8jd7/xPc3l9FwO0IiFyZosNnDv2fKhiPRmhVNLlsVJ4JnHK25uekscaHWZrHzE7oZStsK2lI3J6sB3aNqVA/kAsuwuQkVX8xZIAqkpzwNhCLgRGuU+19TWEPuZuXoPQaLH8jLcrndFHGwWzkTTNTColJCyaH3cHDOi6Q9N+UuKU9iiWbl/qOp4tqVyJ2EkSll60LOqE2QaQepOvOe/tHiuo4w0GlJjmppQUVUw8MN+5eDoOS42f9PXigNhRcUCHkOVZD4ZliOOSWEYkurE6sck4Xr8OFlIW61LBrvGKOl5vg03Vh0xGK7ei21ubxeeDK/ibTMHKCsXSDzwPb/Hn70DaU3jNsslgys/w1aeAZnkIghQj0CTA49+GO9I+nIgJsFEiyxZpbsrY0Wrxd6llYkqT/gEWJgvqm1rbTFXVYTPdRQ+DOolr3+iyPjAsiapMpYBf3Aj2wavhrtEATwgHqJ8RyqR5pqiVJ1FGCMUP8bPtI/B3bVJM8MAj1kAzh+5CiF5jHY9MBnhyuKBef20U/kxSv9JtZpVfSFhX6hSuLYegjUEw4PTM3y7otXvH4TYdZ9POB2bDwjVz+KUGDgsKEv0Gl7mkdaEi8SuN7Cp1XmBzeNTl0EvQjaFGacAc6t1/ynrnjlE41gf3ZnkG9P150BWPsv45FussSmp3BixqAbc4/SE2tVQlaFOsGNlLtEnOx5d3jsARA9ZLLhb5QYq6JElM3y7DWCfAcTocIgSwkubbpbwwUEAnEEBIuRFDFhJgVsGFSQ+37knD4AyYwbqvoVkkCXT/tFEfaIa2h6LwjMv4E/Q1WEBmTp8Fkpb9Wlb6i1dG4Sey1YhQnJGzdv0LYIWtrhC6s6gAAAAASUVORK5CYII%3D";
var upimg = "<img id=markUpdate style='margin:-2px 6px; float:right' src='"+upsrc+"' title='"+language["upgrade"]+"'>";
var unupimg = "<img id=unmarkUpdate style='margin:-2px 6px; float:right' src='"+unsrc+"' title='"+language["delupgrade"]+"'>";

var holz = 0;
var wein = 0;
var marmor = 0;
var glas = 0;
var schwefel = 0;
var stufe = 0;

var marks = loadArray(GM_getValue(store+'-marks',''));
var prod = loadArray(GM_getValue(store+'-prod',''));
var closeimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY7wJJwSCwahwvRsRS4HCkAAMFYmXQ8RYNEoHBgiByFRRAoIB8bknrUKGkKEQYCwQgRIAcDKDEYJD4ZB0EAOw%3D%3D";
var openimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY9wEPmkxgMEiDDAUIIMRAIRqSgKTVGpOzmsSh5CwGBRcHxejEOhUBiMHs9nUnF7SUAABS69xLQe0VdfoKCQQA7";
var hidden = GM_getValue(store+"-hide",false);
var position = GM_getValue(store+"-position",1);
var showOnPage = loadArray(GM_getValue(store+'-showOnPage','({"city": true,"foreigncity": false,"relatedCity": false,"upgrade": true,"building": true,"transport": true,"deployment": false,"world": false,"island": false,"agora": false,"mine": false,"spyMissions":false,"tradeAdvisor": false,"militaryAdvisor": false,"researchAdvisor": false,"diplomacyAdvisor": false,"highscore": false,"options": false,"premiumTrader":true})'));

if(document.getElementById('value_wood')) {
	var ch = parseInt(document.getElementById('value_wood').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
	var cw = parseInt(document.getElementById('value_wine').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
	var cm = parseInt(document.getElementById('value_marble').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
	var cg = parseInt(document.getElementById('value_crystal').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
	var cs = parseInt(document.getElementById('value_sulfur').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
	
	var h = 0;
	var w = 0;
	var m = 0;
	var g = 0;
	var s = 0;
	
	if(document.getElementById('value_wood').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
		h = parseInt(document.getElementById('value_wood').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
	if(document.getElementById('value_wine').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
		w = parseInt(document.getElementById('value_wine').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
	if(document.getElementById('value_marble').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
		m = parseInt(document.getElementById('value_marble').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
	if(document.getElementById('value_crystal').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
		g = parseInt(document.getElementById('value_crystal').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
	if(document.getElementById('value_sulfur').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
		s = parseInt(document.getElementById('value_sulfur').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
	
	if(prod[getCurrentId()] == null)
		prod[getCurrentId()] = new Object();
	
	prod[getCurrentId()]["Holz"] = ch;
	prod[getCurrentId()]["Wein"] = cw;
	prod[getCurrentId()]["Marmor"] = cm;
	prod[getCurrentId()]["Glas"] = cg;
	prod[getCurrentId()]["Schwefel"] = cs;
	
	prod[getCurrentId()]["Holz+"] = h;
	prod[getCurrentId()]["Wein+"] = w;
	prod[getCurrentId()]["Marmor+"] = m;
	prod[getCurrentId()]["Glas+"] = g;
	prod[getCurrentId()]["Schwefel+"] = s;
	
	var d = new Date();
	var time = d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate()+"/"+d.getHours()+"/"+d.getMinutes();
	
	prod[getCurrentId()]["update"] = time;
	
	GM_setValue(store+'-prod',storeArray(prod));
}

var upgrade = document.getElementById('buildingUpgrade');
if(upgrade) {
	stufe = document.getElementsByTagName('h4')[0].innerHTML.substring(document.getElementsByTagName('h4')[0].innerHTML.lastIndexOf(" ")).replace(/:/,"");
	if(!isNaN(parseInt(stufe))) {
		var lis = upgrade.getElementsByTagName('ul')[0].getElementsByTagName('li');
		for(var i=0; i<lis.length; i++) {
			if(lis[i].getAttribute('class') == "wood"|| lis[i].getAttribute('class') == "wood alt")
				holz = parseInt(lis[i].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
			else if(lis[i].getAttribute('class') == "wine" || lis[i].getAttribute('class') == "wine alt")
				wein = parseInt(lis[i].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
			else if(lis[i].getAttribute('class') == "marble" || lis[i].getAttribute('class') == "marble alt")
				marmor = parseInt(lis[i].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
			else if(lis[i].getAttribute('class') == "glass" || lis[i].getAttribute('class') == "glass alt")
				glas = parseInt(lis[i].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
			else if(lis[i].getAttribute('class') == "sulfur" || lis[i].getAttribute('class') == "sulfur alt") {
				schwefel = parseInt(lis[i].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
			}
		}
	
		if(isMarked())
			document.getElementsByTagName('h4')[0].innerHTML += unupimg;
		else
			document.getElementsByTagName('h4')[0].innerHTML += upimg;
		if(document.getElementById('markUpdate'))
			document.getElementById('markUpdate').addEventListener('click', markUpdate, true);
		if(document.getElementById('unmarkUpdate'))
			document.getElementById('unmarkUpdate').addEventListener('click', unmarkUpdate, true);
		upgrade.getElementsByTagName('ul')[1].getElementsByTagName('li')[0].addEventListener('click', unmarkUpdate, true);
	}
}

var buildings = document.getElementById('buildings');
if(buildings) {
	var lis = buildings.getElementsByTagName('li');
	var m_ids = new Array();
	var u_ids = new Array();
	for(var i = 0; i<lis.length; i++) {
		if(lis[i].getAttribute('class').indexOf('building ') >= 0) {
			var t_name = lis[i].getElementsByTagName('h4')[0].innerHTML;
			var t_holz = 0;
			var t_wein = 0;
			var t_marmor = 0;
			var t_glas = 0;
			var t_schwefel = 0;
			var t_position = getPosition(href);
			
			var j=i+1;
			
			while(lis[j].getAttribute('class') != "time") {
				if(lis[j].getAttribute('class') == "wood"|| lis[j].getAttribute('class') == "wood alt") {
					t_holz = parseInt(lis[j].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
				}
				else if(lis[j].getAttribute('class') == "wine" || lis[j].getAttribute('class') == "wine alt")
					t_wein = parseInt(lis[j].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
				else if(lis[j].getAttribute('class') == "marble" || lis[j].getAttribute('class') == "marble alt")
					t_marmor = parseInt(lis[j].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
				else if(lis[j].getAttribute('class') == "glass" || lis[j].getAttribute('class') == "glass alt")
					t_glas = parseInt(lis[j].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
				else if(lis[j].getAttribute('class') == "sulfur" || lis[j].getAttribute('class') == "sulfur alt")
					t_schwefel = parseInt(lis[j].innerHTML.replace(/<span class=\"textLabel\">\w+: <\/span>/,"").replace(/\./g,"").replace(/,/g,""));
				
				j++;
			}

			if(isMarked2(t_name, t_position)) {
				lis[i].getElementsByTagName('h4')[0].innerHTML += unup2(t_name+"_"+t_position+"_"+getCurrentId());
				u_ids.push('unmarkUpdate2_'+t_name+"_"+t_position+"_"+getCurrentId());
			}
			else {
				lis[i].getElementsByTagName('h4')[0].innerHTML += up(t_name, t_holz,t_wein, t_marmor, t_glas, t_schwefel);
				m_ids.push(t_name+"_"+t_holz+"_"+t_wein+"_"+t_marmor+"_"+t_glas+"_"+t_schwefel);
			}
			
			if(lis[i].getElementsByTagName('a')[1]) {
				if(lis[i].getElementsByTagName('a')[1].getAttribute('class') == "button build") {
					var span = lis[i].getElementsByTagName('a')[1].firstChild;
					span.id = "unmarkUpdate_"+t_name+"_"+t_position+"_"+getCurrentId()+"_1";
					span.addEventListener('click', unmarkUpdate2, true);
					var a = lis[i].getElementsByTagName('a')[1];
					a.id = "unmarkUpdate_"+t_name+"_"+t_position+"_"+getCurrentId()+"_2";
					a.addEventListener('click', unmarkUpdate2, true);
				}
			}
		}
	}

	for(var k=0;k<u_ids.length;k++)
		document.getElementById(u_ids[k]).addEventListener('click', unmarkUpdate2, true);

	for(var k=0;k<m_ids.length;k++)
		document.getElementById(m_ids[k]).addEventListener('click', markUpdate2, true);
}


var city = document.getElementById('locations');
var info = document.getElementById('information');
var upgrd = document.getElementById('buildingUpgrade');
var backto = document.getElementById('backTo');
var island = document.getElementById('island');
var tradeAdvisor = document.getElementById('tradeAdvisor');
if(!tradeAdvisor)
	tradeAdvisor = document.getElementById('tradeAdvisorTradeRoute');
var militaryAdvisor = document.getElementById('militaryAdvisorMilitaryMovements');
if(!militaryAdvisor)
	militaryAdvisor = document.getElementById('militaryAdvisorCombatReports');
if(!militaryAdvisor)
	militaryAdvisor = document.getElementById('militaryAdvisorCombatReportsArchive');
if(!militaryAdvisor)
	militaryAdvisor = document.getElementById('militaryAdvisorReportView');
var researchAdvisor = document.getElementById('researchAdvisor');
var diplomacyAdvisor = document.getElementById('diplomacyAdvisor');
if(!diplomacyAdvisor)
	diplomacyAdvisor = document.getElementById('diplomacyAdvisorOutBox');
if(!diplomacyAdvisor)
	diplomacyAdvisor = document.getElementById('diplomacyAdvisorTreaty');
if(!diplomacyAdvisor)
	diplomacyAdvisor = document.getElementById('diplomacyAdvisorAlly');
var world = document.getElementById('worldmap_iso');
var highscore = document.getElementById('highscore');
if(!highscore)
	highscore = document.getElementById('allyHighscore');
var options = document.getElementById('options');
var deployment = document.getElementById('deployment');
var send = document.getElementById('sendIKMessage');
var mine = document.getElementById('resource');
if(!mine)
	mine = document.getElementById('tradegood');
var agora = document.getElementById('islandBoard');
var foreigncity;
var relatedCity = document.getElementById('relatedCities');
var spyMissions = document.getElementById('spyMissions');
var premiumTrader = document.getElementById('premiumTrader');

var show = false;
if(info && city) {
	if(info.innerHTML.search(/<li class="owner">/) == -1 && showOnPage["city"])
		show=true;
	else if(showOnPage["foreigncity"]) {
		foreigncity = city;
		show=true;
	}
}
else if(upgrd && showOnPage["upgrade"]) {
	show=true;
}
else if(document.getElementById('transportGoods') && showOnPage["transport"]) {
	info=backto;
	show=true;
}
else if(island && showOnPage["island"]) {
	show=true;
}
else if(tradeAdvisor &&  showOnPage["tradeAdvisor"]) {
	show=true;
}
else if(militaryAdvisor &&  showOnPage["militaryAdvisor"]) {
	show=true;
}
else if(researchAdvisor &&  showOnPage["researchAdvisor"]) {
	show=true;
}
else if(diplomacyAdvisor &&  showOnPage["diplomacyAdvisor"]) {
	show=true;
}
else if(world &&  showOnPage["world"]) {
	show=true;
}
else if(highscore &&  showOnPage["highscore"]) {
	show=true;
}
else if(options &&  showOnPage["options"]) {
	show=true;
}
else if(deployment && showOnPage["deployment"]) {
	show=true;
}
else if(mine && showOnPage["mine"]) {
	show=true;
}
else if(agora && showOnPage["agora"]) {
	show=true;
}
else if(relatedCity && showOnPage["relatedCity"]) {
	show=true;
}
else if(spyMissions && showOnPage["spyMissions"]) {
	show=true;
}
else if(premiumTrader && showOnPage["premiumTrader"]) {
	show=true;
}

var bauliste = document.createElement('div');
bauliste.setAttribute('id','bauliste');
bauliste.setAttribute('class','dynamic');
bauliste.innerHTML = "<h3 class=\"header\" id=showHideBauliste><img style='display:inline' id=\""+(hidden?"showBauliste":"hideBauliste")+"\" src=\""+(hidden?openimg:closeimg)+"\"> "+language["titel"]+"</h3>";
var baulisteContent = document.createElement('div');
baulisteContent.setAttribute('class','content');
baulisteContent.setAttribute('id','baulisteContent');
if(hidden)
	baulisteContent.style.display = "none";
if(hasMarks())
	baulisteContent.innerHTML = buildList();

bauliste.appendChild(baulisteContent);
bauliste.innerHTML += "<div class=\"footer\"></div>";

if(show || (buildings && showOnPage["building"])) {
	GM_addStyle("#baulisteContent ul li div{position:absolute;left:40px;display:none;background-color:#f1d7ad;border:1px solid #be8d53;border-top-width:4px;font-size:11px;line-height:1em;color:#542c0f;width:auto;white-space:nowrap;padding:4px 8px;z-index:9999999}");
	GM_addStyle("#baulisteContent ul li:hover div{display:block}");
	
	if(show) {
		if(upgrd) {
			if(position==0)
				upgrd.parentNode.insertBefore(bauliste, document.getElementById('breadcrumbs').nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				upgrd.parentNode.insertBefore(bauliste, p);
			}
			else
				upgrd.parentNode.insertBefore(bauliste, upgrd.nextSibling);
		}
		else if(info) {
			if(position==0)
				info.parentNode.insertBefore(bauliste, document.getElementById('breadcrumbs').nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				info.parentNode.insertBefore(bauliste, p);
			}
			else
				info.parentNode.insertBefore(bauliste, info.nextSibling);
		}
		else if(island) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(tradeAdvisor) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(militaryAdvisor) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(researchAdvisor) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(diplomacyAdvisor) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(world) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(highscore) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(options) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(deployment) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(foreigncity) {
			if(position==0)
				info.parentNode.insertBefore(bauliste, document.getElementById('breadcrumbs').nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				info.parentNode.insertBefore(bauliste, p);
			}
			else
				info.parentNode.insertBefore(bauliste, info.nextSibling);
		}
		else if(agora) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(mine) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(relatedCity) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(spyMissions) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
		else if(premiumTrader) {
			var bread = document.getElementById('breadcrumbs');

			if(position==0)
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
			else if(position==2) {
				var p = document.getElementById('mainview');
				bread.parentNode.insertBefore(bauliste, p);
			}
			else
				bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		}
	}
	else {
		var bread = document.getElementById('breadcrumbs');

		if(position==0)
			bread.parentNode.insertBefore(bauliste, bread.nextSibling);
		else if(position==2) {
			var p = document.getElementById('mainview');
			bread.parentNode.insertBefore(bauliste, p);
		}
		else
			bread.parentNode.insertBefore(bauliste, bread.nextSibling);
	}
	
	activateList();
	document.getElementById('showHideBauliste').addEventListener('click',showHide,true);
}

// Optionspanel erzeugen, PlayerID auslesen, wenn möglich
if(page=="options") {
	mySettings();
}


function getPage(href) {
	if(href.indexOf("view=options")>=0)
		return "options";
	else if(getPageByContent() == language['options'])
		return "options";
	else
		return "";
}

function getPageByContent() {
	var mainview = document.getElementById('mainview');
	var header = mainview.getElementsByTagName('h1');
	if(header.length < 1)
		return "";
	else 
		return header[0].innerHTML;
}
function buildList() {
	var out = "";
	var cities = getCityNames();	
	for(var city in cities) {
		if(marks[city] != null && marks[city].length>0) {
			out += "<p style='line-height: 18px; margin: auto 5px'><b>"+cities[city]+"</b></p><ul>";
			
			for(var i in marks[city]) {
				if(marks[city][i]["Name"] != null) {
					var titel = language["cost"];
					var titel2 = language["missing"];
					if(titel != "" && titel.substring(titel.lastIndexOf(" ")) != " ")
						titel += " ";
					if(titel2 != "" && titel2.substring(titel2.lastIndexOf(" ")) != " ")
						titel2 += " ";

					var show_titel2 = false;

					if(marks[city][i]["Holz"]>0) {
						titel += language["wood"]+marks[city][i]["Holz"];
						if(Math.max(parseInt(marks[city][i]["Holz"])-parseInt(prod[city]["Holz"]), 0) > 0) {
							titel2 += language["wood"]+Math.max(parseInt(marks[city][i]["Holz"])-parseInt(prod[city]["Holz"]), 0);
							show_titel2 = true;
						}
					}
					if(titel != "" && titel.substring(titel.lastIndexOf(" ")) != " ")
						titel += " ";
					if(titel2 != "" && titel2.substring(titel2.lastIndexOf(" ")) != " ")
						titel2 += " ";
					if(marks[city][i]["Wein"]>0) {
						titel += language["wine"]+marks[city][i]["Wein"];
						if(Math.max(parseInt(marks[city][i]["Wein"])-parseInt(prod[city]["Wein"]), 0) > 0) {
							titel2 += language["wine"]+Math.max(parseInt(marks[city][i]["Wein"])-parseInt(prod[city]["Wein"]), 0);
							show_titel2 = true;
						}
					}
					if(titel != "" && titel.substring(titel.lastIndexOf(" ")) != " ")
						titel += " ";
					if(titel2 != "" && titel2.substring(titel2.lastIndexOf(" ")) != " ")
						titel2 += " ";
					if(marks[city][i]["Marmor"]>0) {
						titel += language["marble"]+marks[city][i]["Marmor"];
						if(Math.max(parseInt(marks[city][i]["Marmor"])-parseInt(prod[city]["Marmor"]), 0) > 0) {
							titel2 += language["marble"]+Math.max(parseInt(marks[city][i]["Marmor"])-parseInt(prod[city]["Marmor"]), 0);
							show_titel2 = true;
						}
					}
					if(titel != "" && titel.substring(titel.lastIndexOf(" ")) != " ")
						titel += " ";
					if(titel2 != "" && titel2.substring(titel2.lastIndexOf(" ")) != " ")
						titel2 += " ";
					if(marks[city][i]["Glas"]>0) {
						titel += language["glas"]+marks[city][i]["Glas"];
						if(Math.max(parseInt(marks[city][i]["Glas"])-parseInt(prod[city]["Glas"]), 0) > 0) {
							titel2 += language["glas"]+Math.max(parseInt(marks[city][i]["Glas"])-parseInt(prod[city]["Glas"]), 0);
							show_titel2 = true;
						}
					}
					if(titel != "" && titel.substring(titel.lastIndexOf(" ")) != " ")
						titel += " ";
					if(titel2 != "" && titel2.substring(titel2.lastIndexOf(" ")) != " ")
						titel2 += " ";
					if(marks[city][i]["Schwefel"]>0) {
						titel += language["sulfur"]+marks[city][i]["Schwefel"];
						if(Math.max(parseInt(marks[city][i]["Schwefel"])-parseInt(prod[city]["Schwefel"]), 0) > 0) {
							titel2 += language["sulfur"]+Math.max(parseInt(marks[city][i]["Schwefel"])-parseInt(prod[city]["Schwefel"]), 0);
							show_titel2 = true;
						}
					}

	//				if(show_titel2)
	//					titel = titel+" / "+titel2;

					"";



					var color=getColor(marks[city][i], prod[city]);

					out += "<li style='"+color+"line-height: 22px; margin: auto 7px'>"+marks[city][i]["Name"]+language["level"]+marks[city][i]["Stufe"]+calcTime(marks[city][i],prod[city])+unup(marks[city][i]["Name"], marks[city][i]["Position"], city)+"<div><span class=\"textLabel\" style='position:static;display:inline;left:0;height:auto;overflow:visible'>"+titel+"</span>";
					if(show_titel2)
						out += "<br/><span class=\"textLabel\" style='position:static;display:inline;left:0;height:auto;overflow:visible'>"+titel2+"</span>";
					out += "</div></li>";
				}
			}
			
			out += "</ul>";
		}
	}
	
	return out;
}

function activateList() {
	var cities = getCityNames();
	for(var city in cities) {
		for(var i in marks[city]) {
			document.getElementById('unmarkUpdate_'+marks[city][i]["Name"]+'_'+marks[city][i]["Position"]+'_'+city).addEventListener('click', unmarkUpdate2, true);
		}
	}
}

function hasMarks() {
	for(var i in marks)
		if(marks[i].length > 0)
			return true
	
	return false;
}

function showHide() {
	var showBauliste = document.getElementById('showBauliste');
	var hideBauliste = document.getElementById('hideBauliste');
	if(showBauliste) {
		document.getElementById('baulisteContent').style.display = "block";
		showBauliste.src = closeimg;
		showBauliste.id = "hideBauliste";
		GM_setValue(store+"-hide",false);
	}
	else if(hideBauliste){
		document.getElementById('baulisteContent').style.display = "none";
		hideBauliste.src = openimg;
		hideBauliste.id = "showBauliste";
		GM_setValue(store+"-hide",true);
	}
}

function getColor(obj,prod) {
	if(!prod) {
		var cur_holz = parseInt(document.getElementById('value_wood').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
		var cur_wein = parseInt(document.getElementById('value_wine').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
		var cur_marmor = parseInt(document.getElementById('value_marble').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
		var cur_glas = parseInt(document.getElementById('value_crystal').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
		var cur_schwefel = parseInt(document.getElementById('value_sulfur').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
	}
	else {
		var d = new Date();
		var time = d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate()+"/"+d.getHours()+"/"+d.getMinutes();
		var cur_holz = prod["Holz"]+calcProd(time,prod["update"],prod["Holz+"]);
		var cur_wein = prod["Wein"]+calcProd(time,prod["update"],prod["Wein+"]);
		var cur_marmor = prod["Marmor"]+calcProd(time,prod["update"],prod["Marmor+"]);
		var cur_glas = prod["Glas"]+calcProd(time,prod["update"],prod["Glas+"]);
		var cur_schwefel = prod["Schwefel"]+calcProd(time,prod["update"],prod["Schwefel+"]);
	}

	if(obj["Holz"] <= cur_holz && obj["Wein"] <= cur_wein && obj["Marmor"] <= cur_marmor && obj["Glas"] <= cur_glas && obj["Schwefel"] <= cur_schwefel)
		return "color: #00AB00;";
	else if (calcTime(obj, prod, true) == "")
		return "color: #AB0000;";
	else
		return "";
}

function calcTime(obj, prod, color) {
	if(prod == null) {
		var cur_holz = parseInt(document.getElementById('value_wood').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
		var cur_wein = parseInt(document.getElementById('value_wine').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
		var cur_marmor = parseInt(document.getElementById('value_marble').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
		var cur_glas = parseInt(document.getElementById('value_crystal').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));
		var cur_schwefel = parseInt(document.getElementById('value_sulfur').innerHTML.replace(/k/g,".000").replace(/\./g,"").replace(/,/g,""));

		if(obj["Holz"] <= cur_holz && obj["Wein"] <= cur_wein && obj["Marmor"] <= cur_marmor && obj["Glas"] <= cur_glas && obj["Schwefel"] <= cur_schwefel)
			return "";

		var h = 0;
		var w = 0;
		var m = 0;
		var g = 0;
		var s = 0;

		if(document.getElementById('value_wood').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
			h = parseInt(document.getElementById('value_wood').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
		if(document.getElementById('value_wine').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
			w = parseInt(document.getElementById('value_wine').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
		if(document.getElementById('value_marble').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
			m = parseInt(document.getElementById('value_marble').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
		if(document.getElementById('value_crystal').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
			g = parseInt(document.getElementById('value_crystal').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
		if(document.getElementById('value_sulfur').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
			s = parseInt(document.getElementById('value_sulfur').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
	}
	else {
		var h = prod["Holz+"];
		var w = prod["Wein+"];
		var m = prod["Marmor+"];
		var g = prod["Glas+"];
		var s = prod["Schwefel+"];

		var d = new Date();
		var time = d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate()+"/"+d.getHours()+"/"+d.getMinutes();
		var cur_holz = prod["Holz"]+calcProd(time,prod["update"],h);
		var cur_wein = prod["Wein"]+calcProd(time,prod["update"],w);
		var cur_marmor = prod["Marmor"]+calcProd(time,prod["update"],m);
		var cur_glas = prod["Glas"]+calcProd(time,prod["update"],g);
		var cur_schwefel = prod["Schwefel"]+calcProd(time,prod["update"],s);

		if(obj["Holz"] <= cur_holz && obj["Wein"] <= cur_wein && obj["Marmor"] <= cur_marmor && obj["Glas"] <= cur_glas && obj["Schwefel"] <= cur_schwefel)
			return "";

	}
	
	
	
	var time = new Array(-1,-1,-1,-1,-1);
	
	if(parseInt(obj["Holz"])-cur_holz <= 0)
		time[0] = 0;
	else if(h>0)
		time[0] = (parseInt(obj["Holz"])-cur_holz)/h;
	if(parseInt(obj["Wein"])-cur_wein <= 0)
		time[1] = 0;
	else if(w>0)
		time[1] = (parseInt(obj["Wein"])-cur_wein)/w;
	if(parseInt(obj["Marmor"])-cur_marmor <= 0)
		time[2] = 0;
	else if(m>0)
		time[2] = (parseInt(obj["Marmor"])-cur_marmor)/m;
	if(parseInt(obj["Glas"])-cur_glas <= 0)
		time[3] = 0;
	else if(g>0)
		time[3] = (parseInt(obj["Glas"])-cur_glas)/g;
	if(parseInt(obj["Schwefel"])-cur_schwefel <= 0)
		time[4] = 0;
	else if(s>0)
		time[4] = (parseInt(obj["Schwefel"])-cur_schwefel)/s;
		
	if(Math.min(time[0],time[1],time[2],time[3],time[4]) == -1 && color)
		return "";
	
	var t = Math.max(time[0],time[1],time[2],time[3],time[4]);
	
	if(t==-1)
		return "";
	
	var d = parseInt(Math.floor(t/24));
	var t = t-d*24;
	var h = parseInt(Math.floor(t));
	var t = t-h;
	var m = parseInt(Math.floor(t*60));

	var out_d = d+"d ";
	if(d==0)
		out_d="";

	var out_h = h+"h ";
	if(h<10 && d!=0)
		out_h= "0"+out_h;
	
	if(h==0 && d==0)
		out_h= "";
	

	var out_m = m+"m";	
	if(m<10 && d!=0 && h!=0)
		out_m= "0"+out_m;
	if(m==0 && d==0 && h==0)
		return "";

	return " <font size=-2>("+out_d+out_h+out_m+")</font>";
}

function isMarked() {
	var name=language[document.body.getAttribute('id')];
	var position=getPosition(href);
	
	for(var i in marks[getCurrentId()]) {
		if(marks[getCurrentId()][i]["Name"] == name && marks[getCurrentId()][i]["Position"] == position)
			return true;
	}
	
	return false;
}

function isMarked2(name, position) {
	for(var i in marks[getCurrentId()]) {
		if(marks[getCurrentId()][i]["Name"] == name && marks[getCurrentId()][i]["Position"] == position)
			return true;
	}
	
	return false;
}

function indexOf(name, position) {
	for(var i in marks[getCurrentId()]) {
		if(marks[getCurrentId()][i]["Name"] == name && marks[getCurrentId()][i]["Position"] == position)
			return i;
	}
	
	return -1;
}

function markUpdate() {
	var name=language[document.body.getAttribute('id')];
	var position=getPosition(href);
	
	if(marks[getCurrentId()] == null)
		marks[getCurrentId()] = new Array();
		
	var mark = new Object();
	
	mark["Name"] = name;
	mark["Position"] = position;
	mark["Stufe"] = stufe;
	mark["Holz"] = holz;
	mark["Wein"] = wein;
	mark["Marmor"] = marmor;
	mark["Glas"] = glas;
	mark["Schwefel"] = schwefel;
	
	marks[getCurrentId()].push(mark);
	
	GM_setValue(store+"-marks",storeArray(marks));
	
	document.getElementById('markUpdate').src = unsrc;
	document.getElementById('markUpdate').title = language["delupgrade"];
	document.getElementById('markUpdate').removeEventListener('click', markUpdate, true);
	document.getElementById('markUpdate').addEventListener('click', unmarkUpdate, true);
	document.getElementById('markUpdate').id = "unmarkUpdate";
	document.getElementById('baulisteContent').innerHTML = buildList();
	activateList();
}

function markUpdate2(event) {
	var data = event.target.id.split("_");
	var position=getPosition(href);
	
	if(marks[getCurrentId()] == null)
		marks[getCurrentId()] = new Array();
		
	var mark = new Object();
	
	mark["Name"] = data[0];
	mark["Position"] = position;
	mark["Stufe"] = 1;
	mark["Holz"] = data[1];
	mark["Wein"] = data[2];
	mark["Marmor"] = data[3];
	mark["Glas"] = data[4];
	mark["Schwefel"] = data[5];
		
	marks[getCurrentId()].push(mark);
	
	GM_setValue(store+"-marks",storeArray(marks));
	
	event.target.src = unsrc;
	event.target.title = language["delupgrade"];
	event.target.removeEventListener('click', markUpdate2, true);
	event.target.addEventListener('click', unmarkUpdate2, true);
	event.target.id = "unmarkUpdate2_"+data[0]+"_"+position+"_"+getCurrentId();
	document.getElementById('baulisteContent').innerHTML = buildList();
	activateList();
}

function unmarkUpdate() {
	var name=language[document.body.getAttribute('id')];
	var position=getPosition(href);

	for(var i in marks[getCurrentId()]) {
		if(marks[getCurrentId()][i]["Name"] == name && marks[getCurrentId()][i]["Position"] == position)
			marks[getCurrentId()].splice(i,1);
	}

	GM_setValue(store+"-marks",storeArray(marks));


	document.getElementById('unmarkUpdate').src = upsrc;
	document.getElementById('unmarkUpdate').title = language["upgrade"];
	document.getElementById('unmarkUpdate').removeEventListener('click', unmarkUpdate, true);
	document.getElementById('unmarkUpdate').addEventListener('click', markUpdate, true);
	document.getElementById('unmarkUpdate').id = "markUpdate";
	document.getElementById('baulisteContent').innerHTML = buildList();
	activateList();
}

function unmarkUpdate2(event) {
	var data = event.target.id.split("_");
	var name = data[1];
	var position=data[2];
	var city = data[3];

	var tname=language[document.body.getAttribute('id')];
	var cpos=getPosition(href)

	var upgrade = document.getElementById('buildingUpgrade');
	if(upgrade) {
		if(isMarked() && tname==name && getCurrentId()==city && position==cpos) {
			document.getElementById('unmarkUpdate').src = upsrc;
			document.getElementById('unmarkUpdate').title = language["upgrade"];
			document.getElementById('unmarkUpdate').removeEventListener('click', unmarkUpdate, true);
			document.getElementById('unmarkUpdate').addEventListener('click', markUpdate, true);
			document.getElementById('unmarkUpdate').id = "markUpdate";
		}
	}
	var buildings = document.getElementById('buildings');
	if(buildings) {
		if(isMarked2(name, position) && getCurrentId()==city && position==cpos) {
			document.getElementById('unmarkUpdate2_'+name+'_'+position+'_'+city).src = upsrc;
			document.getElementById('unmarkUpdate2_'+name+'_'+position+'_'+city).title = language["upgrade"];
			document.getElementById('unmarkUpdate2_'+name+'_'+position+'_'+city).removeEventListener('click', unmarkUpdate2, true);
			document.getElementById('unmarkUpdate2_'+name+'_'+position+'_'+city).addEventListener('click', markUpdate2, true);
			document.getElementById('unmarkUpdate2_'+name+'_'+position+'_'+city).id = name+"_"+marks[city][indexOf(name,position)]["Holz"]+"_"+marks[city][indexOf(name,position)]["Wein"]+"_"+marks[city][indexOf(name,position)]["Marmor"]+"_"+marks[city][indexOf(name,position)]["Glas"]+"_"+marks[city][indexOf(name,position)]["Schwefel"];
		}
	}
	
	if(data[0].indexOf("2") != -1) {
		event.target.src = upsrc;
		event.target.title = language["upgrade"];
		event.target.removeEventListener('click', unmarkUpdate2, true);
		event.target.addEventListener('click', markUpdate2, true);
		event.target.id = name+"_"+marks[city][indexOf(name,position)]["Holz"]+"_"+marks[city][indexOf(name,position)]["Wein"]+"_"+marks[city][indexOf(name,position)]["Marmor"]+"_"+marks[city][indexOf(name,position)]["Glas"]+"_"+marks[city][indexOf(name,position)]["Schwefel"];
	}
	
	for(var i in marks[city]) {
		if(marks[city][i]["Name"] == name && ""+marks[city][i]["Position"] == position)
			marks[city].splice(i,1);
	}

	GM_setValue(store+"-marks",storeArray(marks));

	document.getElementById('baulisteContent').innerHTML = buildList();
	activateList();
}

function getPosition(href) {
	var pos = href.substring(href.indexOf("position"));
	if(href.indexOf("position")<=0)
		pos="0";
	else
		pos=pos.substring(pos.indexOf("=")+1);
		
	if(pos.indexOf("&")>=0)
		pos=pos.substring(0,pos.indexOf("&"));
		
	return pos;
}

function storeArray(array) {
	return array.toSource();
}

function loadArray(string) {
	if(string=="")
		return new Object();
	else
		return eval(string);
}

function getCurrentId() {
	return document.getElementById('citySelect').value;
}

function up(n, h, w, m, g, s) {
	return "<img id="+n+"_"+h+"_"+w+"_"+m+"_"+g+"_"+s+" style='margin: auto 510px;' src='"+upsrc+"' title='"+language["upgrade2"]+"'>";
}

function unup2(name) {
	return "<img id='unmarkUpdate2_"+name+"' style='margin: auto 510px;' src='"+unsrc+"' title='"+language["delupgrade"]+"'>";
}

function unup(name, position, city) {
	return "<img id='unmarkUpdate_"+name+"_"+position+"_"+city+"' style='float:right; margin:auto 0px; width:12px; height:12px' src='"+unsrc+"' title='"+language["delupgrade"]+"'>";
}

function getCityIds() {
	var cities = document.getElementById('citySelect').getElementsByTagName('option');
	var result = Array();
	
	for(var i=0; i<cities.length; i++)
		result[i]=cities[i].getAttribute('value');
		
	return result;
}

function getCityNames() {
	var cities = document.getElementById('citySelect').getElementsByTagName('option');
	var result = new Object();
	
	for(var i=0; i<cities.length; i++)
		result[cities[i].getAttribute('value')]=cities[i].innerHTML.replace(/&nbsp;/g," ");
		
	return result;
}

function calcProd(time1, time2, perh) {
	if(!time1 || !time2 || !perh)
		return 0;
	var DSTAdjust = 0;
	// constants used for our calculations below
	oneMinute = 1000 * 60;
	var oneHour = oneMinute * 60;
	// equalize times in case date objects have them
	var date1 = new Date();
	date1.setYear(parseInt(time1.split("/")[0]));
	date1.setMonth(parseInt(time1.split("/")[1]));
	date1.setDate(parseInt(time1.split("/")[2]));
	date1.setHours(parseInt(time1.split("/")[3]));
	date1.setMinutes(parseInt(time1.split("/")[4]));
	date1.setSeconds(0);
	var date2 = new Date();
	date2.setYear(parseInt(time2.split("/")[0]));
	date2.setMonth(parseInt(time2.split("/")[1]));
	date2.setDate(parseInt(time2.split("/")[2]));
	date2.setHours(parseInt(time2.split("/")[3]));
	date2.setMinutes(parseInt(time2.split("/")[4]));
	date2.setSeconds(0);
	// take care of spans across Daylight Saving Time changes
	if (date2 > date1) {
	DSTAdjust = 
	    (date2.getTimezoneOffset() - date1.getTimezoneOffset()) * oneMinute;
	} else {
	DSTAdjust = 
	    (date1.getTimezoneOffset() - date2.getTimezoneOffset()) * oneMinute;    
	}
	var diff = Math.abs(date2.getTime() - date1.getTime()) - DSTAdjust;
	return Math.floor(diff/oneHour*perh);
}

function mySettings() {
	var div = document.createElement('div');
	div.setAttribute('class', 'contentBox01h');
	div.setAttribute('id', 'baulisteOptions');
	var checks = "<tr><th colspan=2><center>"+language['settings_show']+"</center></th></tr>";
	for(var p in showOnPage)
		checks += "<tr><th>"+language['settings_'+p]+"</th><td><input id=baulisteShow"+p+" type=checkbox"+(showOnPage[p]?" checked":"")+"></td></tr>";
	
	div.innerHTML  = "<h3 class=header><span class=textLabel>"+language['settings_header']+"</span></h3>";
	div.innerHTML += "<div class=content>";
	div.innerHTML += "<table><tr><th>"+language['settings_position']+"</th><td><select id=baulistePosition>"
	+"<option value=0"+(position==0?" selected":"")+">"+language['settings_pos0']+"</option>"
	+"<option value=1"+(position==1?" selected":"")+">"+language['settings_pos1']+"</option>"
	+"<option value=2"+(position==2?" selected":"")+">"+language['settings_pos2']+"</option>"
	+"</select></td></tr>"
	+ checks
	+"</table><div class=centerButton><input value='"+language["save"]+"' id=baulistebutton class=button type=submit></div><div style='text-align: center;' id=baulistereturnbox></div></div><div class=footer></div>";
	document.getElementById('mainview').appendChild(div);
	
	document.getElementById('baulistebutton').addEventListener('click', saveBauliste, true);
}

function saveBauliste() {
	position = document.getElementById('baulistePosition').value;
	
	showOnPage["city"] = document.getElementById('baulisteShowcity').checked;
	showOnPage["foreigncity"] = document.getElementById('baulisteShowforeigncity').checked;
	showOnPage["upgrade"] = document.getElementById('baulisteShowupgrade').checked;
	showOnPage["transport"] = document.getElementById('baulisteShowtransport').checked;
	showOnPage["island"] = document.getElementById('baulisteShowisland').checked;
	showOnPage["tradeAdvisor"] = document.getElementById('baulisteShowtradeAdvisor').checked;
	showOnPage["militaryAdvisor"] = document.getElementById('baulisteShowmilitaryAdvisor').checked;
	showOnPage["researchAdvisor"] = document.getElementById('baulisteShowresearchAdvisor').checked;
	showOnPage["diplomacyAdvisor"] = document.getElementById('baulisteShowdiplomacyAdvisor').checked;
	showOnPage["world"] = document.getElementById('baulisteShowworld').checked;
	showOnPage["highscore"] = document.getElementById('baulisteShowhighscore').checked;
	showOnPage["options"] = document.getElementById('baulisteShowoptions').checked;
	showOnPage["deployment"] = document.getElementById('baulisteShowdeployment').checked;
	showOnPage["mine"] = document.getElementById('baulisteShowmine').checked;
	showOnPage["agora"] = document.getElementById('baulisteShowagora').checked;
	showOnPage["relatedCity"] = document.getElementById('baulisteShowrelatedCity').checked;
	showOnPage["building"] = document.getElementById('baulisteShowbuilding').checked;
	showOnPage["spyMissions"] = document.getElementById('baulisteShowspyMissions').checked;
	showOnPage["premiumTrader"] = document.getElementById('baulisteShowpremiumTrader').checked;

	GM_setValue(store+'-position',position);
	GM_setValue(store+'-showOnPage',storeArray(showOnPage));

	document.getElementById('baulistereturnbox').innerHTML = language['saved'];
	document.getElementById('baulistebutton').blur();
}
