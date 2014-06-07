// ==UserScript==
// @name           DS - UserScript-Update-Check
// @namespace      Die Stämme
// @description    Version 0.9.4 | Das Script überprüft für die "DS - UserScripts" von Roman-S. (Zombie74) ob evtl. neue Versionen verfügbar sind.
// @include        http://de*.die-staemme.de/*
// @include        http://forum.die-staemme.de/showthread.php?p=1633296*
// @include        http://forum.die-staemme.de/showthread.php?t=101961*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - UserScript-Update-Check 0.9.4";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var welt = teil[0].replace("http://de", "");


// Datum:
var wochentag = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
var wochtag = new Array("So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa.");
var datum = new Date();
var wt = datum.getDay();
var tag = datum.getDate();
var monat = datum.getMonth()+1;
var jahr = datum.getFullYear();
var stunde = datum.getHours();
var minute = datum.getMinutes();
var sekunde = datum.getSeconds();
if(tag < 10) {
	tag = "0" + tag;
}
if(monat < 10) {
	monat = "0" + monat;
}
if(stunde < 10) {
	stunde = "0" + stunde;
}
if(minute < 10) {
	minute = "0" + minute;
}
if(sekunde < 10) {
	sekunde = "0" + sekunde;
}
var check_datum = "<b>" + wochentag[wt] + "</b> den <b>" + tag + "." + monat + "." + jahr + "</b> um <b>" + stunde + ":" + minute + ":" + sekunde + "</b> Uhr";








// Forum "Meine UserScripts":
if((url.match(/p=1633296/)) || 
	(url.match(/t=101961/))) {
	// Anzahl der Scripte auslesen:
	var alt = document.getElementById("post_message_1633296").getElementsByTagName("ul")[0].getElementsByTagName("li").length-1;
	var neu = document.getElementById("post_message_1633296").getElementsByTagName("ul")[1].getElementsByTagName("li").length-1;

	
	if((GM_getValue("Datum-Ist") != undefined) && 
		(GM_getValue("Scripts-Name-Ist") != undefined) && 
		(GM_getValue("Scripts-Vers-Ist") != undefined)) {
		var script_name_ist = GM_getValue("Scripts-Name-Ist").split(";");
		var script_vers_ist = GM_getValue("Scripts-Vers-Ist").split(";");
	}
	else {
		var script_name_ist = new Array();
		var script_vers_ist = new Array();
	}

	// Erlaubte Userscripts:
	var script_name_list = ";";
	var script_vers_list = ";";
	for(i=0; i<=alt; i++) {
		var li = document.getElementById("post_message_1633296").getElementsByTagName("ul")[0].getElementsByTagName("li")[i];
		var script_name = li.getElementsByTagName("a")[0].innerHTML;
		var script_vers = li.getElementsByTagName("b")[0].innerHTML;

		script_name_list += ";" + script_name;
		script_vers_list += ";" + script_vers;
		
		for(x=0; x<script_name_ist.length; x++){
			// Ist das Script installiert?
			// UserScript nicht installiert:
			if(script_name_ist[x] == script_name) {
				// Ist die Aktuelle Version installiert?				
				// Neue Version verfügbar:
				if(script_vers_ist[x] < script_vers) {
					li.innerHTML = "<small style='color:#DB7; cursor:help;' title='Es ist eine neue Version verfügbar'>neu</small> " + li.innerHTML;
					li.innerHTML = "<span style='margin-left:-3px; padding-right:2px; color:#DB7; cursor:help;' title='Es ist eine neue Version verfügbar'>&#x2605;</span> " + li.innerHTML;
				}
				// Aktuelle Version istalliert:
				else { 
					li.innerHTML = "<small style='padding-right:5px; color:#090; cursor:help;' title='Du hast die aktuelle Version installiert'>OK</small> " + li.innerHTML;
					li.innerHTML = "<span style='padding-right:2px; color:#090; cursor:help;' title='Du hast die aktuelle Version installiert'>&#x2714;</span> " + li.innerHTML;
				}
			}
		}
	}
	
	
	// Verbotene Userscripts:
	var script_name_verbot = ";";
	var script_vers_verbot = ";";
	for(i=0; i<=neu; i++) {
		var li = document.getElementById("post_message_1633296").getElementsByTagName("ul")[1].getElementsByTagName("li")[i];
		var script_name     = li.getElementsByTagName("a")[0].innerHTML;
		var script_vers = li.getElementsByTagName("b")[0].innerHTML;
		
		GM_setValue(script_name + "-Vers-Verbot-" + welt, script_vers);
		
		script_name_verbot += ";" + script_name;
		script_vers_verbot += ";" + script_vers;
		
		for(x=0; x<script_name_ist.length; x++){
			// Ist das Script installiert?
			if((script_name_ist[x] == script_name) && (script_vers_ist[x] <=  script_vers)) {
				// Ist die Aktuelle Version installiert?
				li.innerHTML = "<small style='color:#C00; text-decoration:blink; cursor:help;' title='Du hast dieses UserScript installiert. Da das Script verboten wurde solltest Du es deinstallieren'>del.!</small> " + li.innerHTML;				
				li.innerHTML = "<span style='color:#C00; text-decoration:blink; cursor:help;' title='Du hast dieses UserScript installiert. Da das Script verboten wurde solltest Du es deinstallieren'>&#x2718;</span> " + li.innerHTML;
			}
		}
	}
	
	
	
	var letze = document.getElementById("post_message_1633296").getElementsByTagName("ul")[0];
	// Letze Überprüfung auf Aktualisierungen:
	if(GM_getValue("Datum-Ist") == undefined) {
		letze.innerHTML += "<li><small style='color:#666;'>Bisher wurde noch nicht gespeichrt welche UserScripts Du installiert hast.</small></li>";
	}
	else {
		letze.innerHTML += "<li><small style='color:#666;'>Die Liste Deiner installierten UserScripts wurde zuletzt am<br>" + GM_getValue("Datum-Ist") + "<br>aktualisiert.</small></li>";
	}

	// Liste als GM-Value speichern:
	GM_setValue("Scripts-Name-Akt", script_name_list.replace(";;", ""));
	GM_setValue("Scripts-Vers-Akt", script_vers_list.replace(";;", ""));
	GM_setValue("Scripts-Name-Verbot", script_name_verbot.replace(";;", ""));
	GM_setValue("Scripts-Vers-Verbot", script_vers_verbot.replace(";;", ""));
	GM_setValue("Datum-Akt", check_datum);
}









// Spiel:
else {
	// Allgemein:
	var menulinks = document.getElementById("menu_row").getElementsByTagName("a");
	for(var m=0; m<menulinks.length; m++) {
		if(menulinks[m].innerHTML == "Einstellungen") {
			var link_e1 = menulinks[m].href;
		}
	}
	var link_e2 = '<a href="' + link_e1 + '&mode=settings" title="UserScript-Einstellungen"><img src="http://www.die-staemme.de/graphic/buildings/garage.png" height="12px" /></a>';
	document.getElementById("menu_row").innerHTML = document.getElementById("menu_row").innerHTML.replace("Einstellungen</a>", "Einstellungen</a> " + link_e2);
	
	
	// Einstellungen:
	if(url.match(/screen=settings&mode=settings/)) {
		var vers = vers_ist.split(" ");
		var version = "";
		for(v=0; v<vers.length; v++) {
			if(v < vers.length-1) {
				version += vers[v] + " ";
			}
			else {
				version += "<span class='grey'>" + vers[v] + "</span>";
			}
		}
		
		
		var scripts = document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].getElementsByTagName("th").length;
		var rund = document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].getElementsByTagName("th")[scripts-1].getElementsByTagName("a")[0].innerHTML.indexOf("DS - Rundungen");
		if(rund >= 0) {
			var rundung = document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].getElementsByTagName("th")[scripts-1].getAttribute("style");	
		}
		
		
		var tr = new Array();
		tr[0] = document.createElement("tr");
		tr[1] = document.createElement("tr");
		var th = new Array();
		th[0] = document.createElement("th");
		var td = new Array();
		td[0] = document.createElement("td");
		
		th[0].setAttribute("colspan", "2");
		th[0].setAttribute("style", rundung);
		th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=103943' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
		
		td[0].setAttribute("colspan", "2");
		td[0].setAttribute("style", "vertical-align:top;");
		td[0].innerHTML = "Dieses UserScript vereinfacht die Suche nach Aktualisierungen für \"<b>DS - UserScripts</b>\" von ";
		td[0].innerHTML += "<a href='http://forum.die-staemme.de/member.php?u=80784' target='_blank' title='Mein DS-Foren-Profil'>Zombie74</a> ";
		td[0].innerHTML += "(<a href='http://userscripts.org/users/78709' target='_blank' title='Mein Profil bei userscripts.org'>Roman-S.</a>)<br><br>";
		td[0].innerHTML += "Um zu überprüfen ob Aktualisierungen verfügbar sind, musst Du meinen Forenbeitrag ";
		td[0].innerHTML += "\"<a href='http://forum.die-staemme.de/showthread.php?p=1633296#post1633296' target='MeineUserScripts' title='Meine UserScripts'>Meine UserScripts</a>\" ";
		td[0].innerHTML += "aufrufen.<br>";
		td[0].innerHTML += "Das Script vergleicht dann die Versionsnummern der installierten UserScripts mit den aktuell Verfügbaren und zeigt an wenn ein UserScript aktualisiert wurde und eine neue Version verfügbar ist.";
		td[0].innerHTML += "<br><br>";
		
		if((GM_getValue("Datum-Akt") != undefined) && 
			(GM_getValue("Scripts-Name-Akt") != undefined) && 
			(GM_getValue("Scripts-Vers-Akt") != undefined) && 
			(GM_getValue("Scripts-Name-Verbot") != undefined) && 
			(GM_getValue("Scripts-Vers-Verbot") != undefined)) {
			var script_name_akt = GM_getValue("Scripts-Name-Akt").split(";");
			var script_vers_akt = GM_getValue("Scripts-Vers-Akt").split(";");
			var script_name_verbot = GM_getValue("Scripts-Name-Verbot").split(";");
			var script_vers_verbot = GM_getValue("Scripts-Vers-Verbot").split(";");
		}
		else {
			var script_name_akt = new Array();
			var script_vers_akt = new Array();
			var script_name_verbot = new Array();
			var script_vers_verbot = new Array();
		}
	
		td[0].innerHTML += "<br>";
		if(scripts > script_name_akt.length) {
			td[0].innerHTML += "<b style='color:#C00; text-decoration:blink;'>" + scripts + "</b>/";
		}
		else {
			td[0].innerHTML += "<b>" + scripts + "</b>/";
		}
		td[0].innerHTML += script_name_akt.length + "&ensp;UserScripts installiert & aktiviert:<br>";
		
		var script_name_list = ";";
		var script_vers_list = ";";
	
		// Alle installierten UserScriopts durchlaufen:
		for(i=1; i<scripts; i++) {
			var zelle = document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].getElementsByTagName("th")[i];
			var script_link = zelle.innerHTML;
			var script_name = zelle.getElementsByTagName("a")[0].innerHTML.split(" <span")[0];
			var script_vers = zelle.getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML;
			
			GM_setValue(script_name + "-Vers-Ist-" + welt, script_vers);
	
			td[0].innerHTML += "&raquo; " + script_link;
			script_name_list += ";" + script_name;
			script_vers_list += ";" + script_vers;
			
			// Verbotene UserScripts:
			for(x=0; x<script_name_verbot.length; x++){
				if((script_name_verbot[x] == script_name) && (script_vers <= script_vers_verbot[x])) {
					td[0].innerHTML += "&emsp;<span style='color:#C00; text-decoration:blink; cursor:help;' title='Dieses Script wurde vom Support verboten und sollte daher wieder deinstalliert werden.'>&#x2718;</span> ";
					td[0].innerHTML += "<small style='color:#C00; text-decoration:blink; cursor:help;' title='Dieses Script wurde vom Support verboten und sollte daher wieder deinstalliert werden.'>" + script_vers_verbot[x] + "</small>";
					zelle.innerHTML += "&emsp;<small style='color:#C00; text-decoration:blink; cursor:help;' title='Dieses Script wurde vom Support verboten und sollte daher wieder deinstalliert werden.'>deinstallieren!</small> ";
					zelle.innerHTML += "<small style='color:#C00; text-decoration:blink; cursor:help;' title='Dieses Script wurde vom Support verboten und sollte daher wieder deinstalliert werden.'>" + script_vers_verbot[x] + "</small>";
				}
			}
			
			// Auf Updates prüfen:
			var install = -1;
			for(x=0; x<script_name_akt.length; x++){
				if(script_name_akt[x] == script_name) {
					install = x;
				}
			}
			
			if(install == -1) {
				td[0].innerHTML += "&emsp;<small style='color:#C00; cursor:help; text-decoration:blink;' title='Dieses Script scheint noch nicht erlaubt worden zu sein'>&#x26A0; ACHTUNG !</small>";
				zelle.innerHTML += "&emsp;<small style='color:#C00; cursor:help; text-decoration:blink;' title='Dieses Script scheint noch nicht erlaubt worden zu sein'>&#x26A0; ACHTUNG !</small>";
			}
			else {
				if(script_vers_akt[install] > script_vers) {
					td[0].innerHTML += "&emsp;<small style='color:#DB7; cursor:help; text-decoration:blink;' title='Es ist eine neue Version verfügbar'>neu</small>";
					td[0].innerHTML += "&emsp;<small style='color:#999; cursor:help;' title='Es ist eine neue Version verfügbar'>|&emsp;Version " + script_vers_akt[install] + "</small>";
					zelle.innerHTML += "&emsp;<small style='color:#DB7; cursor:help; text-decoration:blink;' title='Es ist eine neue Version verfügbar'>neu</small>";
					zelle.innerHTML += "&emsp;<small style='color:#999; cursor:help;' title='Es ist eine neue Version verfügbar'>|&emsp;Version " + script_vers_akt[install] + "</small>";
				}
				else {
					td[0].innerHTML += "&emsp;<small style='color:#090; cursor:help;' title='Du hast die aktuelle Version installiert'>&#x2714;</small> ";
					td[0].innerHTML += "<small style='color:#090; cursor:help;' title='Du hast die aktuelle Version installiert'>OK</small>";
					zelle.innerHTML += "&emsp;<small style='color:#090; cursor:help;' title='Du hast die aktuelle Version installiert'>&#x2714;</small> ";
					zelle.innerHTML += "<small style='color:#090; cursor:help;' title='Du hast die aktuelle Version installiert'>OK</small>";
				}
			}
			
			// 
			td[0].innerHTML += "<br>";
		}
		
		// Dieses UserScript
		var script_name = vers_ist.split("Check ")[0] + "Check";
		var script_vers = vers_ist.split("Check ")[1];
		var script_link = "<a href='http://forum.die-staemme.de/showthread.php?t=103943' target='_blank' title='Ins Forum zum Thema \"" + script_name + "\" wechseln'>" + script_name + " <span class='grey>" + script_vers + "</span></a>";
	
		td[0].innerHTML += "&raquo; " + script_link;
		script_name_list += ";" + script_name;
		script_vers_list += ";" + script_vers;
		
		for(x=0; x<script_name_akt.length; x++){
			if(script_name_akt[x] == script_name) {
				if(script_vers_akt[x] == script_vers) {
					td[0].innerHTML += "&emsp;<small style='color:#090; cursor:help;' title='Du hast die aktuelle Version installiert'>&#x2714; OK</small>";
				}
				else {
					td[0].innerHTML += "&emsp;<small style='color:#C00; cursor:help; text-decoration:blink;' title='Es ist eine neue Version verfügbar'>neu</small>";
					td[0].innerHTML += "&emsp;<small style='color:#999; cursor:help;' title='Es ist eine neue Version verfügbar'>|&emsp;Version " + script_vers_akt[x] + "</small>";
				}
			}
		}
		td[0].innerHTML += "<br>";
	
	
		// Letze Überprüfung:
		if(GM_getValue("Datum-Akt") == undefined) {
			td[0].innerHTML += "<br><small class='grey'>Bisher wurde noch keine Überprüfung auf Aktualisierungen durchgeführt.</small>";
		}
		else {
			td[0].innerHTML += "<br><small class='grey'>Die letzte Überprüfung auf Aktualisierungen wurde am:<br>" + GM_getValue("Datum-Akt") + "<br>durchgeführt.</small>";
		}
		td[0].innerHTML += " <small><a href='http://forum.die-staemme.de/showthread.php?p=1633296#post1633296' target='_blank'>aktualisieren</a></small>";
		
		
		
		tr[0].appendChild(th[0]);
		tr[1].appendChild(td[0]);
		
		// Liste als GM-Value speichern:
		GM_setValue("Scripts-Name-Ist", script_name_list.replace(";;", ""));
		GM_setValue("Scripts-Vers-Ist", script_vers_list.replace(";;", ""));
		GM_setValue("Datum-Ist", check_datum);
		
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
	}
}