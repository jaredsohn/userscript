// ==UserScript==
// @name           DS - Adelsplan
// @namespace      Die Stämme
// @description	   Version 0.9.3 | Fügt im Browsergame "Die Stämme" in der Dorfansicht eines fremden Dorfes einen Link zum Angriffsplaner von TWplus hinzu und erleichtert das erstellen von Angriffsplänen
// @author         Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// @include        http://*.twplus.org/attack/simple/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Adelsplan 0.9.3";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var welt = teil[0].replace("http://de", "");


// Dorf-ID:
var dorf = url.split("village=");
var dorf_id = dorf[0].split("&")[0];


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
	
	// 
	if(url.match(/einstellung=adelsplan/)) {
		// Nickname & ID als GM-Value speichern:
		GM_setValue("Spieler-" + welt, prompt("Dein Nickname:", GM_getValue("Spieler-" + welt)));
	}
	
	
	var tr = new Array();
	tr[0] = document.createElement("tr");
	tr[1] = document.createElement("tr");
	var th = new Array();
	th[0] = document.createElement("th");
	th[1] = document.createElement("th");
	var td = new Array();
	td[0] = document.createElement("td");
	td[1] = document.createElement("td");
	
	th[0].setAttribute("colspan", "2");
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=102006' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Spieler-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=adelsplan''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=adelsplan''>Einstellungen ändern</a>";
		var spieler = GM_getValue("Spieler-" + welt);
		td[1].innerHTML += "<b style='padding-right:16px;'>Spieler-Nick:</b>" + spieler + "<br>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && (GM_getValue("Spieler-" + welt) == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für den Adelsplaner zu erstellen.")) {
			document.location.href = "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=adelsplan";
		}
	}
}



// Datum:
var datum = new Date();
var tag = datum.getDate();
var monat = datum.getMonth()+1;
var jahr = datum.getFullYear();
var stunde = datum.getHours();
var minute = datum.getMinutes();
var sekunde = datum.getSeconds();



if(url.match(/screen=info_village/)) {
	// Tabelle:
	var name = GM_getValue("Spieler-" + welt);
	var tabelle = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[0];
	var koordin = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.split("|");
	var pos_x = koordin[0];
	var pos_y = koordin[1];
	
	
	var tr1 = document.createElement("tr");
	var tr2 = document.createElement("tr");
	var td = document.createElement("td");
	var th = document.createElement("th");
	td.setAttribute("colspan", "2");
	th.setAttribute("colspan", "2");
	
	
	th.innerHTML = "<b>TWplus Angriffsplan erstellen:</b><br>";
	tr1.appendChild(th);
	
	
	
	var formular = document.createElement("form");
	formular.setAttribute("action", "http://de" + welt + ".twplus.org/attack/simple/");
	formular.setAttribute("target", "_blank");
	
	// Spieler:
	var get_name = document.createElement("input");
	get_name.setAttribute("type", "hidden");
	get_name.setAttribute("name", "p");
	get_name.setAttribute("value", name);
	
	// Koordinaten:
	var get_posX = document.createElement("input");
	get_posX.setAttribute("type", "hidden");
	get_posX.setAttribute("name", "t_x");
	get_posX.setAttribute("value", pos_x);
	
	var get_posY = document.createElement("input");
	get_posY.setAttribute("type", "hidden");
	get_posY.setAttribute("name", "t_y");
	get_posY.setAttribute("value", pos_y);
	
	// Datum:
	// Tag:
	var get_tag = document.createElement("select");
	get_tag.setAttribute("name", "day");
	get_tag.setAttribute("style", "width:40px;");
	var get_t = new Array();
	for(t=1; t<31; t++) {
		get_t[t] = document.createElement("option");
		get_t[t].setAttribute("value", t<10?"0"+t:t);
		if(t == tag) {
			get_t[t].setAttribute("selected", "selected");
			get_t[t].setAttribute("style", "background-color:#FFDD99;");
			get_t[t].setAttribute("title", "Tag");
		}
		else {
			get_t[t].setAttribute("title", "Stunde");
			get_t[t].setAttribute("style", "background-color:#F7EED3;");
		}
		get_t[t].innerHTML = t<10?"0"+t:t;
		get_tag.appendChild(get_t[t]);
		get_tag.setAttribute("style", "background-color:#F7EED3;");
	}
	
	// Monat:
	var get_monat = document.createElement("select");
	get_monat.setAttribute("name", "month");
	get_monat.setAttribute("style", "width:40px;");
	var get_m = new Array();
	for(m=1; m<12; m++) {
		get_m[m] = document.createElement("option");
		get_m[m].setAttribute("value", m<10?"0"+m:m);
		if(m == monat) {
			get_m[m].setAttribute("selected", "selected");
			get_m[m].setAttribute("style", "background-color:#FFDD99;");
			get_m[m].setAttribute("title", "Monat");
		}
		else {
			get_m[m].setAttribute("title", "Stunde");
			get_m[m].setAttribute("style", "background-color:#F7EED3;");
		}
		get_m[m].innerHTML = m<10?"0"+m:m;
		get_monat.appendChild(get_m[m]);
		get_monat.setAttribute("style", "margin-left:1px; background-color:#F7EED3;");
	}
	
	// Jahr:
	var get_jahr = document.createElement("select");
	get_jahr.setAttribute("name", "year");
	get_jahr.setAttribute("style", "width:50px;");
	var get_j = new Array();
	for(j=jahr; j<=(jahr+1); j++) {
		get_j[j] = document.createElement("option");
		get_j[j].setAttribute("value", j<10?"0"+j:j);
		if(j == jahr) {
			get_j[j].setAttribute("selected", "selected");
			get_j[j].setAttribute("style", "background-color:#FFDD99;");
			get_j[j].setAttribute("title", "Jahr");
		}
		else {
			get_j[j].setAttribute("title", "Stunde");
			get_j[j].setAttribute("style", "background-color:#F7EED3;");
		}
		get_j[j].innerHTML = j<10?"0"+j:j;
		get_jahr.appendChild(get_j[j]);
		get_jahr.setAttribute("style", "margin-left:1px; background-color:#F7EED3;");
	}
	
	// Uhrzeit:
	// Stunde:
	var get_std = document.createElement("select");
	get_std.setAttribute("name", "hour");
	get_std.setAttribute("style", "width:40px;");
	var get_h = new Array();
	
	// Nachtbonus
	if(welt >= 6) {
		if(welt <= 15) {
			var nacht = 7;
		}
		else {
			var nacht = 8;
		}
	}
	else {
		var nacht = 0;
	}

	for(h=0; h<=23; h++) {
		get_h[h] = document.createElement("option");
		get_h[h].setAttribute("value", h<10?"0"+h:h);
		get_h[h].innerHTML = h<10?"0"+h:h;
		if(h == 23) {
			get_h[h].setAttribute("selected", "selected");
			get_h[h].setAttribute("title", "Stunde");
			get_h[h].setAttribute("style", "background-color:#FFDD99;");
		}
		else {
			get_h[h].setAttribute("title", "Stunde");
			get_h[h].setAttribute("style", "background-color:#F7EED3;");
		}
		if(h < nacht) {
			get_h[h].setAttribute("style", "background-color:#FCC;");
			get_h[h].setAttribute("title", "Stunde (Verteidiger hat Nachtbonus)");
		}
		get_std.appendChild(get_h[h]);
		get_std.setAttribute("style", "background-color:#F7EED3;");
	}
	
	
	// Minuten:
	var get_min = document.createElement("select");
	get_min.setAttribute("name", "minute");
	get_min.setAttribute("style", "width:40px;");
	var get_i = new Array();
	for(i=0; i<59; i++) {
		get_i[i] = document.createElement("option");
		get_i[i].setAttribute("value", i<10?"0"+i:i);
		get_i[i].innerHTML = i<10?"0"+i:i;
		if(i == 50) {
			get_i[i].setAttribute("selected", "selected");
			get_i[i].setAttribute("title", "Minute");
			get_i[i].setAttribute("style", "background-color:#FFDD99;");
		}
		else {
			get_i[i].setAttribute("title", "Stunde");
			get_i[i].setAttribute("style", "background-color:#F7EED3;");
		}
		get_min.appendChild(get_i[i]);
		get_min.setAttribute("style", "background-color:#F7EED3;");
	}



	
	// Sekunden:
	var get_sek = document.createElement("select");
	get_sek.setAttribute("name", "second");
	get_sek.setAttribute("style", "width:40px;");
	var get_s = new Array();
	for(s=0; s<59; s++) {
		get_s[s] = document.createElement("option");
		get_s[s].setAttribute("value", s<10?"0"+s:s);
		get_s[s].innerHTML = s<10?"0"+s:s;
		if(s == 0) {
			get_s[s].setAttribute("selected", "selected");
			get_s[s].setAttribute("title", "Sekunde");
			get_s[s].setAttribute("style", "background-color:#FFDD99;");
		}
		else {
			get_s[s].setAttribute("title", "Stunde");
			get_s[s].setAttribute("style", "background-color:#F7EED3;");
		}
		get_sek.appendChild(get_s[s]);
		get_sek.setAttribute("style", "background-color:#F7EED3;");
	}
	
	// Next:
	var get_subm = document.createElement("input");
	get_subm.setAttribute("type", "hidden");
	get_subm.setAttribute("name", "submit");
	get_subm.setAttribute("value", "Next");
	
	var get_submit = document.createElement("input");
	get_submit.setAttribute("type", "submit");
	get_submit.setAttribute("value", "OK");
	get_submit.setAttribute("style", "margin:0px; margin-left:10px; background: #DFCCA6; border: 1px outset #DFCCA6; font-weight:900;");
	
	
	formular.appendChild(get_posX);
	formular.appendChild(get_posY);
	formular.appendChild(get_name);
	formular.appendChild(get_tag);
	formular.innerHTML += " . ";
	formular.appendChild(get_monat);
	formular.innerHTML += " . ";
	formular.appendChild(get_jahr);
	formular.innerHTML += "<br>";
	formular.appendChild(get_std);
	formular.innerHTML += " : ";
	formular.appendChild(get_min);
	formular.innerHTML += " : ";
	formular.appendChild(get_sek);
	formular.innerHTML += " Uhr ";
	formular.appendChild(get_subm);
	
	
	formular.appendChild(get_submit);
	td.innerHTML = "";
	td.appendChild(formular);
	tr2.appendChild(td);
	
	
	tabelle.appendChild(tr1);
	tabelle.appendChild(tr2);
}