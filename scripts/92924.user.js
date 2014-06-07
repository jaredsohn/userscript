var metadata=<> 
// ==UserScript==
// @name           KGA Tool
// @namespace      http://userscripts.org/scripts/show/92924
// @description    markiert KGA-Partner
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version        1.0i
// @updater:script http://userscripts.org/scripts/source/92924.user.js
// @updater:meta   http://userscripts.org/scripts/source/92924.meta.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

// Lokalisierung
var languages = {
	de: {
		"highscore": "Highscore",
		"diplomacyAdvisor": "Diplomatieberater",
		"options": "Optionen",
		"saved": "Daten wurden lokal gespeichert.",
		"alt_treaty": "KGA",
		"alt_waiting": "Ausstehend",
		"settings_header": "KGA-Tool Einstellungen",
		"settings_show": "KGAs anzeigen:",
		"settings_show2": "Ausstehende KGAs anzeigen:",
		"settings_show_island": "Inselansicht:",
		"settings_show_embassy": "Botschaft:",
		"settings_show_diplomacyally": "Diplomatieberater Allianz:",
		"settings_show_diplomacy": "Diplomatieberater:",
		"settings_show_highscore": "Highscore:",
		"save": "Speichern!"
	},
	en: {
		"highscore": "Highscore",
		"diplomacyAdvisor": "Diplomacyadvisor",
		"options": "Options",
		"saved": "Data stored locally.",
		"alt_treaty": "CAT",
		"alt_waiting": "Pending",
		"settings_header": "CAT-Tool Settings",
		"settings_show": "Show CAT:",
		"settings_show2": "Show pending CAT:",
		"settings_show_island": "Islandview:",
		"settings_show_embassy": "Embassy:",
		"settings_show_diplomacyally": "Diplomacy Advisor Ally:",
		"settings_show_diplomacy": "Diplomacy Advisor:",
		"settings_show_highscore": "Highscore:",
		"save": "Save!"
	},
	es: {
		"highscore": "Clasificación",
		"diplomacyAdvisor": "Asesor Diplomatico",
		"options": "Opciones",
		"saved": "Datos almacenados localmente.",
		"alt_treaty": "CAT",
		"alt_waiting": "Pendiente",
		"settings_header": "CAT-Tool Opciones",
		"settings_show": "Mostrar CAT:",
		"settings_show2": "Mostrar CAT pendientes:",
		"settings_show_island": "Vista Isla:",
		"settings_show_embassy": "Embajada:",
		"settings_show_diplomacyally": "Asesor Diplomatico-Alianza:",
		"settings_show_diplomacy": "Asesor Diplomatico-Entrada:",
		"settings_show_highscore": "Clasificación:",
		"save": "Guardar!"
	},
};

// Bilder
var images = {
	"treaty": "data:image/gif;base64,R0lGODlhIAAgAMQAAMi4qtLEtbKlmZmNhCIhIJCFe4Z6cfjp2LmupKWViNjPw%2F356lBKRejWw%2Bvj13luZuHOuf7%2B%2B8GtnaWbkmNIMWtkXfLdyPjjzjo2M%2F3z3WFZUuLc0Obp6fnu4K6djgAAACH5BAEAAB8ALAAAAAAgACAAAAX%2F4CeO5Dh8BbBxnCKUcExuk7BEeM4Vci8WiYAjR8QhfLIAInG5dW7QxQIZC0wkzYUDopBkHI6MglryACyZzMGx2UgmnnjgRBYBGgfpAQJWbBwGDwwGdSIeAh1pGRcQEmB%2FAAOEhQUIYRkBARAABRpXAAoJhR9WAg0JFQ8GA5IPGqoThRsHoAqqSgVAqwYVo4kNCx0WAQIFBggAE7kMowgDGxENwH%2FBEMUGk3VAAnADCk8dDZG5oygAABoJAgMCAEoJAxUU5QkS5%2Be5gdgP5R8CENYSGPOAigEDDRj6ZQAlDkEmQRgI8CsXgNEAUBc2PIhIIB0dMsikncJQwYAGAgQwsmhY9YLKtwUAIEiDcBJlyoMlB0jwMSTYAQkALVgQoMGgwQcFdMqEEAOBAIezFjSAUPGCBWMFzACQwLViAwF%2BSGQ99FTIngZWAwShKuCpnEb1%2FjgQcSyp03Z%2BrA6zIK7tGwNmPCTtYKUEhUFP2965cKDxAUZbE8Bpl6nARBlX%2FAbAo8ZxGza4svmQ3JabWQeOHXThMYqCgQTwEqhorBoB634jYNcI4OIjbhLdJoj6HcNYjxAAOw%3D%3D",
	"waiting": "data:image/gif;base64,R0lGODlhIAAgAIQeADQ0CVdYD3l7FH1+FZOUGaWnHLi6H87QI9jbLNvdOt7gSd/hUuDiV+PkZeXncuXndOnqheztmu/wq/LzuvP0wfT1xvX2y/b2z/b30vf41/n53vr64/v87f39+P///////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAB8ALAAAAAAgACAAAAX+4CeO5Jh8CERhmNSUcExSS8N1eI4hci8iioglR8Q5fLKIQ3G5aW5QDgcZiyweTY5FInlsLJaNhFpiQCqbTcZCoTwWjHjkRBZBJhlpRgKWUCwHBgIHdSIMDRppGxddYH8QCYSFCA5hGxEREhAIBFcQEgqFH1YNEwoFBgcJkQYEqQuFFBmfEqlKCECqBwWiiRMcGhURDQgHDhALuAKiDgkUHRO/f8AuxZJ1QA1wCRJPGhOQuKIoEBAECg0JDRBKCgkFA+MKD+XluIEHgeMfDVwNCsUYnBIggECAfRs+gXOASVAAAAb2RWCU4NMFCgYeAjhHh8yxaKYCFDhAAACAAASwVL2g0o2DwgkSSpo8WXBkggc+hgDL8IBLhQoNCBAkaADBTQkwYzhowFAWB5gTL1QohsAMhAdYJ07oR4FE1UNMheyZIDVCEAnDmMrpMu+PBRHGjC5d50eqsArgGjR4c8AMA6MarJQYMIip3jsXMijOwOiqAjjrMCGI2OOK3gcR8KhZ3IbNrWs+HuvVJtbC4i0PeIgacECBOwUqFG9xoHrfCNc1MqWzHWPbglC8YxTrEQIAOw%3D%3D"
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

var store = server+'-'+lang+'-kgatool';
var treatyPartner = loadArray(GM_getValue(store+'-treatyPartner',''));
var treatyWaiting = loadArray(GM_getValue(store+'-treatyWaiting',''));
var showTreaties = GM_getValue(store+'-showTreaty',true);
var showWaiting = GM_getValue(store+'-showWaiting',false);
var showOnPage = loadObject(GM_getValue(store+'-showOnPage',''));

// Einlesen der KGA-Partner, Museumsdaten
if(page=="museum") {
	var tables = document.getElementById('mainview').getElementsByTagName('table');
	var rows = tables[tables.length-1].getElementsByTagName('tr');
	treatyPartner = new Array();
	for(var i=1; i<rows.length; i++) {
		var t = rows[i].getElementsByTagName('a')[0].getAttribute('href').replace(/\?view=sendIKMessage&receiverId=(\d+)/, "$1");

		treatyPartner[i] = t;
	}
	GM_setValue(store+'-treatyPartner',storeArray(treatyPartner));

	treatyWaiting = new Array();
	if(tables.length==2) {
		rows = tables[0].getElementsByTagName('tr');
		for(var i=1; i<rows.length; i++) {
			var t = rows[i].getElementsByTagName('a')[0].getAttribute('href').replace(/\?view=sendIKMessage&receiverId=(\d+)/, "$1");

			treatyWaiting[i] = t;
		}
	}
	GM_setValue(store+'-treatyWaiting',storeArray(treatyWaiting));
}
// KGAs markieren
else if((page=="diplomacyAdvisorAlly" || page=="embassy") && (showTreaties || showWaiting) && showOnPage[page]) {
	var t = "#"+treatyPartner.join("#")+"#";
	var t2 = "#"+treatyWaiting.join("#")+"#";
	var table = document.getElementById('memberList').getElementsByTagName('tr');
	
	var idlistA = Array();
	
	for(var i=1; i<table.length; i++) {
		var links = table[i].getElementsByTagName('a');
		var j = 0;
		while(j<links.length && links[j].getAttribute('class') != "message") {
			j++;
		}
			
		var link = links[j];
		
		if(j<links.length) {
			idlistA[i] = link.getAttribute('href').replace(/\?view=sendIKMessage\&receiverId=(\d+)/,"$1");
		}
	}
	
	var idlist = "#"+idlistA.join("#")+"#";

	for(var i=1; i<table.length; i++) {
		var td = table[i].getElementsByTagName('td')[1];
		if(t.indexOf("#"+idlistA[i]+"#") >= 0 && showTreaties)
			td.innerHTML += "&nbsp;<img src='"+images["treaty"]+"' alt='"+language['alt_treaty']+"' style='width: 20px; height: 20px; float:right'>";
		else if(t2.indexOf("#"+idlistA[i]+"#") >= 0 && showWaiting)
			td.innerHTML += "&nbsp;<img src='"+images["waiting"]+"' alt='"+language['alt_waiting']+"' style='width: 20px; height: 20px; float:right'>";
		else
			td.innerHTML += "&nbsp;<img src='"+images["treaty"]+"' alt='"+language['alt_treaty']+"' style='width: 20px; height: 20px; visibility:hidden; float:right'>";
	}
}
else if(page=="highscore" && (showTreaties || showWaiting) && showOnPage[page]) {
	var t = "#"+treatyPartner.join("#")+"#";
	var t2 = "#"+treatyWaiting.join("#")+"#";
	var rows = document.getElementById('mainview').getElementsByTagName('table')[1].getElementsByTagName('tr');
	var idlistA = Array();
	
	for(var i=1; i<rows.length; i++) {
		var links = rows[i].getElementsByTagName('a');
		var link = links[links.length-1];
		
		if(link.getAttribute('class') == null) {
			idlistA[i] = link.getAttribute('href').replace(/\/index.php\?view=sendIKMessage\&receiverId=(\d+)/,"$1");
		}
	}
	
	var idlist = "#"+idlistA.join("#")+"#";
	for(var i=1; i<rows.length; i++) {
		var td = rows[i].getElementsByTagName('td')[1];
		if(t.indexOf("#"+idlistA[i]+"#") >= 0 && showTreaties)
			td.innerHTML += "&nbsp;<img src='"+images["treaty"]+"' alt='"+language['alt_treaty']+"' style='width: 20px; height: 20px; float:right'>";
		else if(t2.indexOf("#"+idlistA[i]+"#") >= 0 && showWaiting)
			td.innerHTML += "&nbsp;<img src='"+images["waiting"]+"' alt='"+language['alt_waiting']+"' style='width: 20px; height: 20px; float:right'>";
		else 
			td.innerHTML += "&nbsp;<img src='"+images["treaty"]+"' alt='"+language['alt_treaty']+"' style='width: 20px; height: 20px; visibility:hidden; float:right'>";
	}
}
else if(page=="diplomacyAdvisor" && (showTreaties || showWaiting) && showOnPage[page]) {
	var t = "#"+treatyPartner.join("#")+"#";
	var t2 = "#"+treatyWaiting.join("#")+"#";
	var rows = document.getElementById('messages').getElementsByTagName('tr');
	var idlistA = Array();
	
	var j=0;
	for(var i=0; i<rows.length; i++) {
		if(rows[i].getAttribute('id') != null) {
			if(rows[i].getAttribute('id').indexOf("tbl_reply")===0) {
				var links = rows[i].getElementsByTagName('a');
				var link = links[0];
				
				if(link.getAttribute('class') == 'button') {
					var id = link.getAttribute('href').replace(/\?view=sendIKMessage\&receiverId=(\d+)\&replyTo=\d+/,"$1");
					if(id.replace(/\d/g,"") == "") {
						idlistA[j] = id;
					}
					j++;
				}
			}
		}
	}
	
	var idlist = "#"+idlistA.join("#")+"#";

	j=0;
	for(var i=0; i<rows.length; i++) {
		if(rows[i].getAttribute('id') != null) {
			if(rows[i].getAttribute('id').indexOf("message")===0) {
				var td = rows[i].getElementsByTagName('td')[2];
				if(td != null) {
					if(t.indexOf("#"+idlistA[j]+"#") >= 0 && showTreaties)
						td.innerHTML += "&nbsp;<img src='"+images["treaty"]+"' alt='"+language['alt_treaty']+"' style='width: 20px; height: 20px; float:right'>";
					else if(t2.indexOf("#"+idlistA[j]+"#") >= 0 && showWaiting)
						td.innerHTML += "&nbsp;<img src='"+images["waiting"]+"' alt='"+language['alt_waiting']+"' style='width: 20px; height: 20px; float:right'>";
					else 
						td.innerHTML += "&nbsp;<img src='"+images["treaty"]+"' alt='"+language['alt_treaty']+"' style='width: 20px; height: 20px; visibility:hidden; float:right'>";
					
					j++
				}
			}
		}
	}
}
else if(page=="island" && (showTreaties || showWaiting) && showOnPage[page]) {
	var t = "#"+treatyPartner.join("#")+"#";
	var t2 = "#"+treatyWaiting.join("#")+"#";
	var idlistA = Array();

	for(var i=0; i<16; i++) {
		var city = document.getElementById('cityLocation'+i);
		if(city.getAttribute('class') != "cityLocation buildplace")
			idlistA[i] = city.getElementsByTagName('ul')[0].getElementsByTagName('a')[0].getAttribute('href').replace(/\?view=sendIKMessage\&receiverId=(\d+)/,"$1");
	}
	
	var idlist = "#"+idlistA.join("#")+"#";
	
	for(var i=0; i<16; i++) {
		var city = document.getElementById('cityLocation'+i);
		if(city != null && city.getAttribute('class') != "cityLocation buildplace") {
			var spans = city.getElementsByTagName('span');
			for(var j=0;j<spans.length;j++) {
				if(spans[j].getAttribute('class') == "after") {
					if(t.indexOf("#"+idlistA[i]+"#") >= 0 && showTreaties)
						spans[j].innerHTML += "<img src='"+images["treaty"]+"' alt='"+language['alt_treaty']+"' style='width: 20px; height: 20px; float:right'>";
					else if(t2.indexOf("#"+idlistA[i]+"#") >= 0 && showWaiting)
						spans[j].innerHTML += "<img src='"+images["waiting"]+"' alt='"+language['alt_waiting']+"' style='width: 20px; height: 20px; float:right'>";
				}
					
			}
		}
	}
}

// Optionspanel erzeugen, PlayerID auslesen, wenn möglich
else if(page=="options") {
	mySettings();
}


// Hilfs-Funktionen
function getServer(href) {
	var server = href.replace(/........(\d+).*/,"$1");
	return server;
}

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
}

function getPage(href) {
	if(href.indexOf("view=museum")>=0)
		return "museum";
	else if(href.indexOf("view=diplomacyAdvisorAlly")>=0)
		return "diplomacyAdvisorAlly";
	else if(href.indexOf("view=diplomacyAdvisor")>=0)
		return "diplomacyAdvisor";
	else if(href.indexOf("view=embassy")>=0)
		return "embassy";
	else if(href.indexOf("view=island")>=0)
		return "island";
	else if(href.indexOf("view=highscore")>=0)
		return "highscore";
	else if(href.indexOf("view=options")>=0)
		return "options";
	else if(getPageByContent() == language['highscore'])
		return "highscore";
	else if(getPageByContent() == language['diplomacyAdvisor'] && getTabPosition()==0)
		return "diplomacyAdvisor";
	else if(getPageByContent() == language['diplomacyAdvisor'] && getTabPosition()==3)
		return "diplomacyAdvisorAlly";
	else if(getPageByContent() == language['options'])
		return "options";
	else if(getPageByContent2() == "island")
		return "island";
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

function getPageByContent2() {
	if(document.getElementById('cityLocation0') != null)
		return "island";
	else
		return "";
}

function getTabPosition() {
	var tabz = document.getElementById('tabz');
	if(tabz != null) {
		if(tabz.getElementsByTagName('td')[0].getAttribute('class') == "selected") return 0;
		else if(tabz.getElementsByTagName('td')[1].getAttribute('class') == "selected") return 1;
		else if(tabz.getElementsByTagName('td')[2].getAttribute('class') == "selected") return 2;
		else if(tabz.getElementsByTagName('td')[3].getAttribute('class') == "selected") return 3;
	}
	else {
		if(document.getElementById('options_debug') != null)
			return 1;
	}
	
	return -1;
}

function storeArray(array) {
	return array.join(";");
}

function loadArray(string) {
	if(string == "")
		return Array();
	else
		return string.split(";");
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
	div.setAttribute('id', 'kgatoolOptions');
	
	var check = "";
	if(showTreaties)
		check = " checked";
	var check2 = "";
	if(showWaiting)
		check2 = " checked";
		
	var checks = {
			"island": "",
			"embassy": "",
			"diplomacyAdvisor": "",
			"diplomacyAdvisorAlly": "",
			"highscore": ""
		     };
	for(var p in showOnPage) {
		if(showOnPage[p])
			checks[p] = " checked";
	}
	div.innerHTML  = "<h3 class=header><span class=textLabel>"+language['settings_header']+"</span></h3>";
	div.innerHTML += "<div class=content>";
	div.innerHTML += "<table><tr><th>"+language['settings_show']+"</th><td><input id=kgatoolShow type=checkbox"+check+"></td></tr>"
		        +"<tr><th>"+language['settings_show2']+"</th><td><input id=kgatoolShow2 type=checkbox"+check2+"></td></tr>"
		        +"<tr><th>"+language['settings_show_island']+"</th><td><input id=kgatoolShowIsland type=checkbox"+checks['island']+"></td></tr>"
		        +"<tr><th>"+language['settings_show_embassy']+"</th><td><input id=kgatoolShowEmbassy type=checkbox"+checks['embassy']+"></td></tr>"
		        +"<tr><th>"+language['settings_show_diplomacy']+"</th><td><input id=kgatoolShowDipl type=checkbox"+checks['diplomacyAdvisor']+"></td></tr>"
		        +"<tr><th>"+language['settings_show_diplomacyally']+"</th><td><input id=kgatoolShowAlly type=checkbox"+checks['diplomacyAdvisorAlly']+"></td></tr>"
		        +"<tr><th>"+language['settings_show_highscore']+"</th><td><input id=kgatoolShowScore type=checkbox"+checks['highscore']+"></td></tr>"
		        +"</table><div class=centerButton><input value='"+language["save"]+"' id=kgatoolbutton class=button type=submit></div><div style='text-align: center;' id=kgatoolreturnbox></div></div><div class=footer></div>";
	document.getElementById('mainview').appendChild(div);
	
	document.getElementById('kgatoolbutton').addEventListener('click', saveKGATool, true);
}

function saveKGATool() {
	showTreaties = document.getElementById('kgatoolShow').checked;
	showWaiting = document.getElementById('kgatoolShow2').checked;
	
	showOnPage['island'] = document.getElementById('kgatoolShowIsland').checked;
	showOnPage['embassy'] = document.getElementById('kgatoolShowEmbassy').checked;
	showOnPage['diplomacyAdvisorAlly'] = document.getElementById('kgatoolShowAlly').checked;
	showOnPage['diplomacyAdvisor'] = document.getElementById('kgatoolShowDipl').checked;
	showOnPage['highscore'] = document.getElementById('kgatoolShowScore').checked;

	GM_setValue(store+'-showTreaty',showTreaties);
	GM_setValue(store+'-showWaiting',showWaiting);
	GM_setValue(store+'-showOnPage',storeObject(showOnPage));

	document.getElementById('kgatoolreturnbox').innerHTML = language['saved'];
	document.getElementById('kgatoolbutton').blur();
}
