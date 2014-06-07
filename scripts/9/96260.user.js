var metadata=<> 
// ==UserScript==
// @name           Extra Notizen
// @namespace      http://userscripts.org/scripts/show/96260
// @description    Sidebox für Notizen
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version        1.0d
// @updater:script http://userscripts.org/scripts/source/96260.user.js
// @updater:meta   http://userscripts.org/scripts/source/96260.meta.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

// Lokalisierung
var languages = {
	de: {
		"titel": "Notizen",
		// Optionen
		"options": "Optionen",
		"settings_header": "Notizen Einstellungen",
		"settings_position": "Position:",
		"settings_pos0": "Oben",
		"settings_pos1": "Unten",
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
	},
	en: {
		"titel": "Notes",
		// Optionen
		"options": "Options",
		"settings_header": "Note Settings",
		"settings_position": "Position:",
		"settings_pos0": "Top",
		"settings_pos1": "Bottom",
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
		"settings_diplomacyAdvisor": "Diplomace advisor:",
		"settings_highscore": "Highscore:",
		"settings_options": "Options:",
		"settings_premiumTrader": "Premium trader:",
		"saved": "Data saved localy.",
		"save": "Save!",
	},
};

// Script
var href = document.location.href;
var server = getServer(href);
var lang = getLanguage(href);

// Update-Check
var update = new Updater(metadata,lang);
update.update();

var language = languages[lang];
if(language == null)
	language = languages['en'];
	
var page = getPage(href);

var store = server+'-'+lang+'-notes';
var notizen = GM_getValue(store+'-notizen','');
var position = GM_getValue(store+"-position",0);
var hidden = GM_getValue(store+"-hide",false);
var closeimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY7wJJwSCwahwvRsRS4HCkAAMFYmXQ8RYNEoHBgiByFRRAoIB8bknrUKGkKEQYCwQgRIAcDKDEYJD4ZB0EAOw%3D%3D";
var openimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY9wEPmkxgMEiDDAUIIMRAIRqSgKTVGpOzmsSh5CwGBRcHxejEOhUBiMHs9nUnF7SUAABS69xLQe0VdfoKCQQA7";
var showOnPage = loadObject(GM_getValue(store+'-showOnPage','({"city": true,"foreigncity": true,"relatedCity": true,"upgrade": true,"building": true,"transport": true,"deployment": true,"world": true,"island": true,"agora": true,"mine": true,"spyMissions":true,"tradeAdvisor": true,"militaryAdvisor": true,"researchAdvisor": true,"diplomacyAdvisor": true,"highscore": true,"options": true,"premiumTrader":true})'));

// Notizblock
var bread = document.getElementById("breadcrumbs");
var main = document.getElementById("mainview");
if (bread && main) {
	var upgrade = document.getElementById('buildingUpgrade');
	var buildings = document.getElementById('buildings');
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
	
	if(show) {
		var note = document.createElement('div');
		note.setAttribute('id','note');
		note.setAttribute('class','dynamic');
		note.innerHTML = "<h3 class=\"header\" id=showHideNote><img style='display:inline' id=\""+(hidden?"showNote":"hideNote")+"\" src=\""+(hidden?openimg:closeimg)+"\"> "+language["titel"]+"</h3>";
		var noteContent = document.createElement('div');
		noteContent.setAttribute('class','content');
		noteContent.setAttribute('id','noteContent');
		if(hidden)
			noteContent.style.display = "none";

		noteContent.innerHTML = "<center><textarea id=notetext style='width: 95%' rows=20>"+notizen+"</textarea></center>";

		note.appendChild(noteContent);
		note.innerHTML += "<div class=\"footer\"></div>";

		if(position==0)
			bread.parentNode.insertBefore(note, bread.nextSibling.nextSibling);
		else
			bread.parentNode.insertBefore(note, main);

		document.getElementById('showHideNote').addEventListener('click',showHide,true);
		document.getElementById('notetext').addEventListener('keyup',saveNote,true);
		document.getElementById('notetext').addEventListener('change',saveNote,true);
		document.getElementById('notetext').addEventListener('blur',saveNote,true);
	}
}

function saveNote(e) {
	if(e.type == "blur")
		GM_setValue(store+'-notizen',document.getElementById('notetext').value)
	else if(e.type == "change")
		GM_setValue(store+'-notizen',document.getElementById('notetext').value)
	else if(e.type == "keyup")
		if(e.keyCode == 13)
			GM_setValue(store+'-notizen',document.getElementById('notetext').value)
}


// Optionspanel erzeugen, PlayerID auslesen, wenn möglich
if(page=="options") {
	mySettings();
}


// Hilfs-Funktionen
function showHide() {
	var showNote = document.getElementById('showNote');
	var hideNote = document.getElementById('hideNote');
	if(showNote) {
		document.getElementById('noteContent').style.display = "block";
		showNote.src = closeimg;
		showNote.id = "hideNote";
		GM_setValue(store+"-hide",false);
	}
	else if(hideNote){
		document.getElementById('noteContent').style.display = "none";
		hideNote.src = openimg;
		hideNote.id = "showNote";
		GM_setValue(store+"-hide",true);
	}
}

function getServer(href) {
	var server = href.replace(/........(\d+).*/,"$1");
	return server;
}

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
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

function storeObject(array) {
	return array.toSource();
}

function loadObject(string) {
	if(string=="")
		return new Object();
	else
		return eval(string);
}

function mySettings() {
	var div = document.createElement('div');
	div.setAttribute('class', 'contentBox01h');
	div.setAttribute('id', 'noteOptions');
	
	var checks = "<tr><th colspan=2><center>"+language['settings_show']+"</center></th></tr>";
	for(var p in showOnPage)
		checks += "<tr><th>"+language['settings_'+p]+"</th><td><input id=notizenShow"+p+" type=checkbox"+(showOnPage[p]?" checked":"")+"></td></tr>";

	div.innerHTML  = "<h3 class=header><span class=textLabel>"+language['settings_header']+"</span></h3>";
	div.innerHTML += "<div class=content>";
	div.innerHTML += "<table><tr><th>"+language['settings_position']+"</th><td><select id=notizenPosition>"
	+"<option value=0"+(position==0?" selected":"")+">"+language['settings_pos0']+"</option>"
	+"<option value=1"+(position==1?" selected":"")+">"+language['settings_pos1']+"</option>"
	+"</select></td></tr>"
	+checks
	+"</table><div class=centerButton><input value='"+language["save"]+"' id=notizenbutton class=button type=submit></div><div style='text-align: center;' id=notizenreturnbox></div></div><div class=footer></div>";
	document.getElementById('mainview').appendChild(div);
	
	document.getElementById('notizenbutton').addEventListener('click', saveSettings, true);
}

function saveSettings() {
	showOnPage["city"] = document.getElementById('notizenShowcity').checked;
	showOnPage["foreigncity"] = document.getElementById('notizenShowforeigncity').checked;
	showOnPage["upgrade"] = document.getElementById('notizenShowupgrade').checked;
	showOnPage["transport"] = document.getElementById('notizenShowtransport').checked;
	showOnPage["island"] = document.getElementById('notizenShowisland').checked;
	showOnPage["tradeAdvisor"] = document.getElementById('notizenShowtradeAdvisor').checked;
	showOnPage["militaryAdvisor"] = document.getElementById('notizenShowmilitaryAdvisor').checked;
	showOnPage["researchAdvisor"] = document.getElementById('notizenShowresearchAdvisor').checked;
	showOnPage["diplomacyAdvisor"] = document.getElementById('notizenShowdiplomacyAdvisor').checked;
	showOnPage["world"] = document.getElementById('notizenShowworld').checked;
	showOnPage["highscore"] = document.getElementById('notizenShowhighscore').checked;
	showOnPage["options"] = document.getElementById('notizenShowoptions').checked;
	showOnPage["deployment"] = document.getElementById('notizenShowdeployment').checked;
	showOnPage["mine"] = document.getElementById('notizenShowmine').checked;
	showOnPage["agora"] = document.getElementById('notizenShowagora').checked;
	showOnPage["relatedCity"] = document.getElementById('notizenShowrelatedCity').checked;
	showOnPage["building"] = document.getElementById('notizenShowbuilding').checked;
	showOnPage["spyMissions"] = document.getElementById('notizenShowspyMissions').checked;
	showOnPage["premiumTrader"] = document.getElementById('notizenShowpremiumTrader').checked;
	position = document.getElementById('notizenPosition').value;

	GM_setValue(store+'-position',position);
	GM_setValue(store+'-showOnPage',storeObject(showOnPage));

	document.getElementById('notizenreturnbox').innerHTML = language['saved'];
	document.getElementById('notizenbutton').blur();
}
