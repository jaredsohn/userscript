// ==UserScript==
// @name          [PG] X-Tra CommandCenter
// @namespace     Autor: das_bazie
// @namespace     http://userscripts.org
// @description   Komandozentrale fuer pennergame
// @version       1.2.5
// @include       *pennergame.de*
// @exclude       *chat*
// @exclude       *board*
// @exclude       *forum*
// @exclude       *change_please*
// ==/UserScript==

// seitenadresse ermitteln
var url = document.location.href;
// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
var maxspenden = 50
var spenden1 = 49
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var gamelink = "http://berlin.pennergame.de"
var maxspenden = 20
var spenden1 = 19
}
// Linkadressen fuer muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var gamelink = "http://muenchen.pennergame.de"
var maxspenden = 50
var spenden1 = 49
}
// Linkadressen fuer koeln
if (url.indexOf("http://koeln.pennergame")>=0) {
var gamelink = "http://koeln.pennergame.de"
var maxspenden = 50
var spenden1 = 49
}

var medialink = "http://static.pennergame.de"

// css-style in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// groesse und possition hauptcontainer
addGlobalStyle('div#cc_main_div { position:absolute; width:400px; height:128px; top:100px; left:50%; margin:0 0 0 -160px; z-index:100; }')
addGlobalStyle('div#cc_main_div { -moz-border-radius:5px; background:url(http://i43.tinypic.com/xgeln5.png); background-position:-20px -20px; font-size:12px; }')
// groesse und ausrichtung navigation
addGlobalStyle('div#cc_navigation { width:120px; height:100%; float:left; }')
// addGlobalStyle('div.nav_point:hover { cursor:pointer; background:#3c3c3c; color:#ffffff; -moz-border-radius:5px; }')
// groesse und ausrichtung content
addGlobalStyle('div#cc_content { width:279px; height:100%; float:right; text-align:left; overflow:auto; }')
// css fuer updatelinks (normal und hover)
addGlobalStyle('div#cc_content a.update_link { color:green; }')
addGlobalStyle('div#cc_content a.update_link:hover { color:red; }')
// css fuer anklickbare a tags und span (normal und hover)
addGlobalStyle('a.klickbar:hover, span.klickbar:hover, div.nav_point:hover { cursor:pointer; background:#3c3c3c; color:#ffffff; -moz-border-radius:5px; }')
addGlobalStyle('a.klickbar, span.klickbar { color:#000000; text-decoration:underline; }')
// css trennlienie
addGlobalStyle('hr.trenner { margin:3px; size:2px; }')
// statusbalken und hintergrund
addGlobalStyle('div.prozentbalken_bg_1 { background:url('+medialink+'/img/pv4/icons/processbar_bg.jpg) repeat-x;border:1px solid #000;height:12px;width:200px}')
addGlobalStyle('div.prozentbalken_1 { background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url('+medialink+'/img/processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;z-index:1;}')
addGlobalStyle('div#active_prozent_1 { color:#fff;background:url('+medialink+'/img/pv4/icons/processbar_active.gif) repeat-x;}')
// css fuer update anzeigen
addGlobalStyle('div#update_list ul.update_list { list-style-type:circle; }')

// angaben fuer Updatefunktion
var CurrentScriptVersion = '1.2.5';
var xmlurl = 'http://userscripts.org/scripts/show/75845';
var downloadurl = 'http://userscripts.org/scripts/source/75845.user.js';

// menue div erzeugen
var cc_div = document.createElement('div');
document.body.appendChild(cc_div);

// ladegrafik
loadpic = "<img src=\"http://i39.tinypic.com/e04d5j.jpg\">";

// navigationspunkte
var navidiv = "<div id=\"cc_navigation\">"+
"<div id=\"cc_mein_penner\" class=\"nav_point\">Mein Penner</div>"+
"<div id=\"cc_inventar\" class=\"nav_point\">Inventar</div>"+
"<div id=\"cc_bildung\" class=\"nav_point\">Bildung</div>"+
"<div id=\"cc_plunder\" class=\"nav_point\">Plunder</div>"+
"<div id=\"cc_update\" class=\"nav_point\">Scriptinfos</div>"+
"</div>";

cc_div.innerHTML = "<div id=\"cc_main_div\">"+navidiv+"<div id=\"cc_content\"><br><center>Lade Daten, Bitte warten .....<br>"+loadpic+"</center></div></div>";

// eventlistener userinfo (beim laden der seite)
window.addEventListener('load', function datenabruf() {

// auslesen der userid zum pruefen ob penner eingelogt
HTTP_REQ(gamelink+"/overview/",'GET',login_check)
function login_check(resp) {
	var content = resp.responseText;
	try {
	var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
	// wenn penner eingelogt userinfos auslesen ....
	HTTP_REQ(gamelink+"/overview/",'GET',user_infos,maxspenden,spenden1)
	// weiterbildungspruefung ......
	HTTP_REQ(gamelink+"/skills/",'GET',skill_pruefung)
	// .... und auf update pruefen
	HTTP_REQ(xmlurl,'GET',update_anzeige,CurrentScriptVersion,xmlurl,downloadurl);
	} catch(err) {
	// wenn penner nicht eingelogt penner comander ausblenden
	cc_div.innerHTML = "";
	}
}
},false);

// eventlistener userinfo (beim klick auf den menuepunkt)
document.getElementById('cc_mein_penner').addEventListener('click', function datenabruf() {
document.getElementById("cc_content").innerHTML = "<br><center>Lade Daten, Bitte warten .....<br>"+loadpic+"</center>";
HTTP_REQ(gamelink+"/overview/",'GET',user_infos,maxspenden,spenden1)
},false);

// eventlistener inventar
document.getElementById('cc_inventar').addEventListener('click', function datenabruf() {
document.getElementById("cc_content").innerHTML = "<br><center>Lade Daten, Bitte warten .....<br>"+loadpic+"</center>";
HTTP_REQ(gamelink+"/stock/foodstuffs/",'GET',inventar)
},false);

// eventlistener bildung
document.getElementById('cc_bildung').addEventListener('click', function datenabruf() {
document.getElementById("cc_content").innerHTML = "<br><center>Lade Daten, Bitte warten .....<br>"+loadpic+"</center>";
HTTP_REQ(gamelink+"/skills/",'GET',bildung_1);
},false);

// eventlistener update
document.getElementById('cc_update').addEventListener('click', function datenabruf() {
document.getElementById("cc_content").innerHTML = "<br><center>Lade Daten, Bitte warten .....<br>"+loadpic+"</center>";
HTTP_REQ(xmlurl,'GET',update_pruefung,CurrentScriptVersion,xmlurl,downloadurl);
},false);

// eventlistener plunder
document.getElementById('cc_plunder').addEventListener('click', function datenabruf() {
document.getElementById("cc_content").innerHTML = "<br><center>Lade Daten, Bitte warten .....<br>"+loadpic+"</center>";
HTTP_REQ(gamelink+"/stock/plunder/",'GET',plunder);
},false);

// userinfo abfrage
function user_infos(resp,maxspenden,spenden1) {

		var content = resp.responseText;
		var clean = content.match(/Sauberkeit.*>(\d+)%</)[1];
		var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[1];
		
		if (spendenbisherpur > spenden1)
		{var spenden = "<a class=\"klickbar\" href=\"/change_please/statistics/\"><font color=\"green\"size=\"2px\"><b>"+spendenbisherpur+"</font><font color=\"black\"size=\"2px\"> / </font><font color=\"green\"size=\"2px\">"+maxspenden+"</font></b></a>";}
		else
		{var spenden = "<a class=\"klickbar\" href=\"/change_please/statistics/\"><font color=\"red\"size=\"2px\"><b>"+spendenbisherpur+"</font><font color=\"black\"size=\"2px\"> / </font><font color=\"green\"size=\"2px\">"+maxspenden+"</font></b></a>";}
		
		HTTP_REQ(gamelink+"/daily/",'GET',sammelkarten_aufgabe,spenden,clean);
		
}
function sammelkarten_aufgabe(resp,spenden,clean) {

	var content = resp.responseText;
	var karten_aufgabe_1 = content.split('<div style="text-align:')[1].split('</div>')[0];
	
	var div_vor = "<div style=\"text-align: center; width: 90%; padding: 3px; border: 1px solid rgb(153, 153, 153); background: none repeat scroll 0% 0% rgb(34, 34, 34);\">";
	var div_nach = "</div>";
	
	if (karten_aufgabe_1.indexOf("Aufgabe schon erledigt.")>=0) {
	var link = "<a href=\"/daily/\" style=\"color:green;\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Du hast diese Aufgabe schon erledigt.</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Plunder basteln")>=0) {
	var link = "<a href=\"/stock/plunder/craft/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Einen Plunder Basteln</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("der SB posten")>=0) {
	var link = "<a href=\"/gang/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt in der Shoutbox posten</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("eigenen Plunder")>=0) {
	var link = "<a href=\"/stock/ug_plunder/create/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Erstelle einen eigenen Plunder</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Snack essen")>=0) {
	var link = "<a href=\"/stock/foodstuffs/food/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt einen kleinen Snack essen</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Haustierweiterbildung")>=0) {
	var link = "<a href=\"/skills/pet/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Eine Haustierweiterbildung starten</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Promillepegel")>=0) {
	var link = "<a href=\"/skills/pet/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Promillepegel &uuml;ber 2&#8240;</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Plunder verkaufen")>=0) {
	var link = "<a href=\"/stock/plunder/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt Plunder verkaufen</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Plunderbank deiner Bande")>=0) {
	var link = "<a href=\"/gang/stuff/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Plunder in die Plunderbank deiner Bande einzahlen</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Bandenkasse einzahlen")>=0) {
	var link = "<a href=\"/gang/credit/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Geld in deine Bandenkasse einzahlen</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Lose kaufen")>=0) {
	var link = "<a href=\"/city/games/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt Lose kaufen</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("PN an einen Freund")>=0) {
	var link = "<a href=\"/messages/write/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt eine PN an einen Freund versenden</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Einen Kampf gewinnen")>=0) {
	var link = "<a href=\"/fight/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Einen Kampf gewinnen</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Flaschen verkaufen")>=0) {
	var link = "<a href=\"/stock/bottle/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt Flaschen verkaufen</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Ein Verbrechen begehen")>=0) {
	var link = "<a href=\"/activities/crime/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Ein Verbrechen begehen</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Haustierkampf")>=0) {
	var link = "<a href=\"/fight/pet/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt einen Haustierkampf starten</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Jetzt im Supermarkt")>=0) {
	var link = "<a href=\"/city/supermarket/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt im Supermarkt Getr&auml;nke kaufen.</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("Flaschensammeln starten")>=0) {
	var link = "<a href=\"/activities/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Einmal Flaschensammeln starten.</a></strong>"+div_nach+"";
	}
	if (karten_aufgabe_1.indexOf("sauber werden")>=0) {
	var link = "<a href=\"/city/washhouse/\">";
	var karten_aufgabe = ""+div_vor+"<strong>"+link+"Jetzt einmal 100% sauber werden.</a></strong>"+div_nach+"";
	}
	
	HTTP_REQ(gamelink+"/daily/rewards/",'GET',sammelkarten,spenden,clean,karten_aufgabe);
}
function sammelkarten(resp,spenden,clean,karten_aufgabe) {

		var content = resp.responseText;
		
		if (url.indexOf("http://malle.pennergame.de/")>=0) {
		} else {
		
		var anzahl_karten = content.match(/Deine Sammelkarten:.*>(\d+)</);
		var anzahl_karten = RegExp.$1;

		}
		
		// Farben fuer Sauberkeit in %
		var color = new Array();

		color[0] = "#FF0000"; // rot 0%
		color[10] = "#FF0000"; // rot 10%
		color[20] = "#FF0000"; // rot 20%
		color[30] = "#FF0000"; // rot 30%
		color[40] = "#AF7817"; // orange 40%
		color[50] = "#AF7817"; // orange 50%
		color[60] = "#AF7817"; // orange 60%
		color[70] = "#306754"; // mediumseagreen 70%
		color[80] = "#306754"; // mediumseagreen 80%
		color[90] = "#306754"; // mediumseagreen 90%
		color[100] = "#347C17"; // green4 100%
		
		var sauberkeit = "Sauberkeit: <font color=\""+color[clean]+"\"><b>"+clean+"&#37;</b></font>";
		
		if (clean != 100){
		wasch_anzeige_1(spenden,sauberkeit,anzahl_karten,karten_aufgabe,clean);
		} else {
		wasch_anzeige_2(spenden,sauberkeit,anzahl_karten,karten_aufgabe);
		}

}

// anzeige wenn nicht zu 100% sauber
function wasch_anzeige_1(spenden,sauberkeit,anzahl_karten,karten_aufgabe,clean) {

	var wasch_mich = "F&uuml;r <span class=\"klickbar\" id=\"waschen_6\">6&euro; waschen</span> <span class=\"klickbar\" id=\"waschen_25\">25&euro; waschen</span>";
	
	if (url.indexOf("http://malle.pennergame.de/")>=0) { var sammel_karten_anzeige = ""; }
	else { var sammel_karten_anzeige = "Sammelkarten: <a class=\"klickbar\" href=\""+gamelink+"/daily/rewards/\">"+anzahl_karten+"</a><br>Aktuelle Aufgabe: <a class=\"klickbar\" href=\""+gamelink+"/daily/\">"+karten_aufgabe+"</a><hr class=\"trenner\">"; }
	
	document.getElementById("cc_content").innerHTML = "<u><b>Mein Penner</b></u><br><br>"+sauberkeit+" "+wasch_mich+"<hr class=\"trenner\">Spenden: "+spenden+"<hr class=\"trenner\">"+sammel_karten_anzeige+"";	

	// eventlistener waschen 6€
	document.getElementById('waschen_6').addEventListener('click', function waschen(){
	mach_mich_sauber(gamelink+"/city/washhouse/buy/",'POST',1,clean)
	},false);
	// eventlistener waschen 25€
	document.getElementById('waschen_25').addEventListener('click', function waschen(){
	mach_mich_sauber(gamelink+"/city/washhouse/buy/",'POST',2,clean)
	},false);
}

// anzeige wenn zu 100% sauber
function wasch_anzeige_2(spenden,sauberkeit,anzahl_karten,karten_aufgabe) {

	var wasch_mich = "";
	
	if (url.indexOf("http://malle.pennergame.de/")>=0) { var sammel_karten_anzeige = ""; }
	else { var sammel_karten_anzeige = "Sammelkarten: <a class=\"klickbar\" href=\""+gamelink+"/daily/rewards/\">"+anzahl_karten+"</a><br>Aktuelle Aufgabe: <a class=\"klickbar\" href=\""+gamelink+"/daily/\">"+karten_aufgabe+"</a><hr class=\"trenner\">"; }

	
	document.getElementById("cc_content").innerHTML = "<u><b>Mein Penner</b></u><br><br>"+sauberkeit+"  "+wasch_mich+"<hr class=\"trenner\">Spenden: "+spenden+"<hr class=\"trenner\">"+sammel_karten_anzeige+"";
}

// inventar abfrage
function inventar(resp) {

		var content = resp.responseText;
		
		// Benoetigte Biermenge ausrechnen:
		Posa = document.getElementById("options");
		Pos = Posa.getElementsByTagName("li")[1].innerHTML.indexOf(".");
		alk_alt = Posa.getElementsByTagName("li")[1].innerHTML.substr(Pos - 1, 4).replace(".", "");
		
		Benoetigtprozent = 350 - alk_alt;
		Benoetigtprozent2 = 299 - alk_alt;
		
		benoetigt_bier = Math.floor(Benoetigtprozent2/35);
		benoetigt_wodka = Math.floor(Benoetigtprozent/250);
		benoetigt_gluehwein = Math.floor(Benoetigtprozent/80);
		
		// abfrage anzahl bier
		try {
		
		var anzahl_bier = content.split('id="lager_Bier" value="')[1].split('"')[0];
		
		if (anzahl_bier <= 30) {
		var bier_kaufen_btn = "<input id=\"anzahl_bier_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"bier_kaufen\" value=\"Kaufen\"/>";
		} else {
		var bier_kaufen_btn = "<input id=\"anzahl_bier_kaufen\" type=\"hidden\" size=\"2\" value=\"\" /><input type=\"hidden\" id=\"bier_kaufen\" value=\"Kaufen\"/>";
		} } catch(err) {
		var anzahl_bier = "<span style=\"color:red;\">Kein Bier im Inventar</span>";
		}
		var bier_trinken_btn = "<input id=\"anzahl_bier_trinken\" type=\"text\" size=\"2\" value=\""+benoetigt_bier+"\"/><input type=\"submit\" id=\"bier_trinken\" value=\"Trinken\"/>"
		var invent_bier = "Anzahl <b>Bier</b> im Inventar: "+anzahl_bier+" <br>"+bier_trinken_btn+" "+bier_kaufen_btn+"<hr class=\"trenner\">";

		// abfrage anzahl wodka
		try {
		
		var anzahl_wodka = content.split('id="lager_Wodka" value="')[1].split('"')[0];
		
		if (anzahl_wodka <= 30) {
		var wodka_kaufen_btn = "<input id=\"anzahl_wodka_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"wodka_kaufen\" value=\"Kaufen\"/>";
		} else {
		var wodka_kaufen_btn = "<input id=\"anzahl_wodka_kaufen\" type=\"hidden\" size=\"2\" value=\"\" /><input type=\"hidden\" id=\"wodka_kaufen\" value=\"Kaufen\"/>";	
		} } catch(err) {
		var anzahl_wodka = "<span style=\"color:red;\">Kein Wodka im Inventar</span>";
		}
		var wodka_trinken_btn = "<input id=\"anzahl_wodka_trinken\" type=\"text\" size=\"2\" value=\""+benoetigt_wodka+"\" /><input type=\"submit\" id=\"wodka_trinken\" value=\"Trinken\"/>"
		var invent_wodka = "Anzahl <b>Wodka</b> im Inventar: "+anzahl_wodka+"<br>"+wodka_trinken_btn+" "+wodka_kaufen_btn+"<hr class=\"trenner\">";
		
		// abfrage anzahl gluehwein
		try {
		
		var anzahl_gluehwein = content.split('id="lager_xm_drink" value="')[4].split('"')[0];
		
		var gluehwein_trinken_btn = "<input id=\"anzahl_gluehwein_trinken\" type=\"text\" size=\"2\" value=\""+benoetigt_gluehwein+"\" /><input type=\"submit\" id=\"gluehwein_trinken\" value=\"Trinken\"/>";
		var invent_gluehwein = "Anzahl <b>Gl&uuml;hwein</b> im Inventar: "+anzahl_gluehwein+"<br>"+gluehwein_trinken_btn+"<hr class=\"trenner\">";
		
		} catch(err) {
		
		var anzahl_gluehwein = "";
		var gluehwein_trinken_btn = "<input id=\"anzahl_gluehwein_trinken\" type=\"hidden\" size=\"2\" value=\""+benoetigt_gluehwein+"\" /><input type=\"hidden\" id=\"gluehwein_trinken\" value=\"Trinken\"/>";
		var invent_gluehwein = ""+gluehwein_trinken_btn+"";
		
		}

		HTTP_REQ(gamelink+"/stock/foodstuffs/food/",'GET',inventar_2,invent_bier,invent_wodka,invent_gluehwein);
		
}
function inventar_2(resp,invent_bier,invent_wodka,invent_gluehwein) {

		var content = resp.responseText;
		
		// Benoetigte Brotmenge ausrechnen:
		Posa = document.getElementById("options");
		Pos = Posa.getElementsByTagName("li")[1].innerHTML.indexOf(".");
		alk_alt = Posa.getElementsByTagName("li")[1].innerHTML.substr(Pos - 1, 4).replace(".", "");
		
		benoetigt_brot = Math.ceil(alk_alt/35);
		benoetigt_wurst = Math.ceil(alk_alt/100);
		benoetigt_burger = Math.ceil(alk_alt/200);
		
		// anzahl brot
		try {
		
		var anzahl_brot = content.split('id="lager_Brot" value="')[1].split('"')[0];
		var brot_essen_btn = "<input id=\"anzahl_brot_essen\" type=\"text\" size=\"2\" value=\""+benoetigt_brot+"\"/><input type=\"submit\" id=\"brot_essen\" value=\"Essen\"/>"
		
		if (anzahl_brot <= 30) {
		var brot_kaufen_btn = "<input id=\"anzahl_brot_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"brot_kaufen\" value=\"Kaufen\"/>";
		} else {
		var brot_kaufen_btn = "<input id=\"anzahl_brot_kaufen\" type=\"hidden\" size=\"2\" value=\"\" /><input type=\"hidden\" id=\"brot_kaufen\" value=\"Kaufen\"/>";
		}
		
		} catch(err) {
		
		var anzahl_brot = "<span style=\"color:red;\">Kein Brot im Inventar</span>";
		var brot_essen_btn = "<input id=\"anzahl_brot_essen\" type=\"hidden\" size=\"2\" value=\""+benoetigt_brot+"\"/><input type=\"hidden\" id=\"brot_essen\" value=\"Essen\"/>"
		var brot_kaufen_btn = "<input id=\"anzahl_brot_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"brot_kaufen\" value=\"Kaufen\"/>";
		
		}
		
		var invent_brot = "Anzahl <b>Brot</b> im Inventar: "+anzahl_brot+" <br>"+brot_essen_btn+" "+brot_kaufen_btn+"<hr class=\"trenner\">";

		// anzahl curry
		try {
		
		var anzahl_curry = content.split('id="lager_Currywurst" value="')[1].split('"')[0];
		var curry_essen_btn = "<input id=\"anzahl_curry_essen\" type=\"text\" size=\"2\" value=\""+benoetigt_wurst+"\"/><input type=\"submit\" id=\"curry_essen\" value=\"Essen\"/>"
		
		if (anzahl_curry <= 30) {
		var curry_kaufen_btn = "<input id=\"anzahl_curry_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"curry_kaufen\" value=\"Kaufen\"/>";
		} else {
		var curry_kaufen_btn = "<input id=\"anzahl_curry_kaufen\" type=\"hidden\" size=\"2\" value=\"\" /><input type=\"hidden\" id=\"curry_kaufen\" value=\"Kaufen\"/>";
		}
		
		} catch(err) {
		
		var anzahl_curry = "<span style=\"color:red;\">Keine Currywurst im Inventar</span>";
		var curry_essen_btn = "<input id=\"anzahl_curry_essen\" type=\"hidden\" size=\"2\" value=\""+benoetigt_wurst+"\"/><input type=\"hidden\" id=\"curry_essen\" value=\"Essen\"/>"
		var curry_kaufen_btn = "<input id=\"anzahl_curry_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"curry_kaufen\" value=\"Kaufen\"/>";
		
		}
		
		
		var invent_curry = "Anzahl <b>Currywurst</b> im Inventar: "+anzahl_curry+" <br>"+curry_essen_btn+" "+curry_kaufen_btn+"<hr class=\"trenner\">";

		// anzahl hamburger
		try {
		
		var anzahl_hamburger = content.split('id="lager_Hamburger" value="')[1].split('"')[0];
		var hamburger_essen_btn = "<input id=\"anzahl_hamburger_essen\" type=\"text\" size=\"2\" value=\""+benoetigt_burger+"\"/><input type=\"submit\" id=\"hamburger_essen\" value=\"Essen\"/>"
		
		if (anzahl_hamburger <= 30) {
		var hamburger_kaufen_btn = "<input id=\"anzahl_hamburger_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"hamburger_kaufen\" value=\"Kaufen\"/>";
		} else {
		var hamburger_kaufen_btn = "<input id=\"anzahl_hamburger_kaufen\" type=\"hidden\" size=\"2\" value=\"\" /><input type=\"hidden\" id=\"hamburger_kaufen\" value=\"Kaufen\"/>";
		}
		
		} catch(err) {
		
		var anzahl_hamburger = "<span style=\"color:red;\">Kein Brot im Inventar</span>";
		var hamburger_essen_btn = "<input id=\"anzahl_hamburger_essen\" type=\"hidden\" size=\"2\" value=\""+benoetigt_burger+"\"/><input type=\"hidden\" id=\"hamburger_essen\" value=\"Essen\"/>"
		var hamburger_kaufen_btn = "<input id=\"anzahl_hamburger_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"hamburger_kaufen\" value=\"Kaufen\"/>";
		
		}
		
		var invent_hamburger = "Anzahl <b>Hammburger</b> im Inventar: "+anzahl_hamburger+" <br>"+hamburger_essen_btn+" "+hamburger_kaufen_btn+"<hr class=\"trenner\">";
		
		// anzahl curry
		try {
		
		var anzahl_curry = content.split('id="lager_Currywurst" value="')[1].split('"')[0];
		var curry_essen_btn = "<input id=\"anzahl_curry_essen\" type=\"text\" size=\"2\" value=\""+benoetigt_wurst+"\"/><input type=\"submit\" id=\"curry_essen\" value=\"Essen\"/>"
		
		if (anzahl_curry <= 30) {
		var curry_kaufen_btn = "<input id=\"anzahl_curry_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"curry_kaufen\" value=\"Kaufen\"/>";
		} else {
		var curry_kaufen_btn = "<input id=\"anzahl_curry_kaufen\" type=\"hidden\" size=\"2\" value=\"\" /><input type=\"hidden\" id=\"curry_kaufen\" value=\"Kaufen\"/>";
		}
		
		} catch(err) {
		
		var anzahl_curry = "<span style=\"color:red;\">Keine Currywurst im Inventar</span>";
		var curry_essen_btn = "<input id=\"anzahl_curry_essen\" type=\"hidden\" size=\"2\" value=\""+benoetigt_wurst+"\"/><input type=\"hidden\" id=\"curry_essen\" value=\"Essen\"/>"
		var curry_kaufen_btn = "<input id=\"anzahl_curry_kaufen\" type=\"text\" size=\"2\" value=\"\" /><input type=\"submit\" id=\"curry_kaufen\" value=\"Kaufen\"/>";
		
		}
		
		var invent_curry = "Anzahl <b>Currywurst</b> im Inventar: "+anzahl_curry+" <br>"+curry_essen_btn+" "+curry_kaufen_btn+"<hr class=\"trenner\">";

		// anzahl halloween suessigkeiten
		try {
		
		var anzahl_candys = content.split('id="lager_hw_candy" value="')[1].split('"')[0];
		var candys_essen_btn = "<input id=\"anzahl_candys_essen\" type=\"text\" size=\"2\" value=\""+benoetigt_burger+"\"/><input type=\"submit\" id=\"candys_essen\" value=\"Essen\"/>"

		var invent_candys = "Anzahl <b>Halloween S&uuml;&szlig;igkeiten</b> im Inventar: "+anzahl_candys+" <br>"+candys_essen_btn+"<hr class=\"trenner\">";
		
		} catch(err) {
		
		var anzahl_candys = "";
		var candys_essen_btn = "<input id=\"anzahl_candys_essen\" type=\"hidden\" size=\"2\" value=\""+benoetigt_burger+"\"/><input type=\"hidden\" id=\"candys_essen\" value=\"Essen\"/>"
		
		var invent_candys = anzahl_candys + candys_essen_btn;
		
		}
		
		// anzahl stollen
		try {
		
		var anzahl_stollen = content.split('id="lager_xm_food" value="')[1].split('"')[0];
		var stollen_essen_btn = "<input id=\"anzahl_stollen_essen\" type=\"text\" size=\"2\" value=\""+benoetigt_burger+"\"/><input type=\"submit\" id=\"stollen_essen\" value=\"Essen\"/>"

		var invent_stollen = "Anzahl <b>Stollen</b> im Inventar: "+anzahl_stollen+" <br>"+stollen_essen_btn+"<hr class=\"trenner\">";
		
		} catch(err) {
		
		var anzahl_stollen = "";
		var stollen_essen_btn = "<input id=\"anzahl_stollen_essen\" type=\"hidden\" size=\"2\" value=\""+benoetigt_burger+"\"/><input type=\"hidden\" id=\"stollen_essen\" value=\"Essen\"/>"
		
		var invent_stollen = anzahl_stollen + stollen_essen_btn;
		
		}

		// anzeige im menue
		document.getElementById("cc_content").innerHTML = "<u><b>Inventar</b></u><br><br>"+ invent_bier + invent_wodka + invent_gluehwein + invent_brot + invent_curry + invent_hamburger + invent_candys +"";
		
		// eventlistener bier trinken
		document.getElementById('bier_trinken').addEventListener('click', function trinken(alk_alt){
		GM_setValue("anzahl_bier_trinken", document.getElementById('anzahl_bier_trinken').value);
		var alk_menge = GM_getValue("anzahl_bier_trinken", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		mach_mich_besoffen(gamelink+"/stock/foodstuffs/use/",'POST',"Bier","35","1",alk_menge,alk_alt)
		},false);
		
		// eventlistener bier kaufen
		document.getElementById('bier_kaufen').addEventListener('click', function kaufen(anzahl_bier){
		GM_setValue("anzahl_bier_kaufen", document.getElementById('anzahl_bier_kaufen').value);
		var anz_alk_kaufen = GM_getValue("anzahl_bier_kaufen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		kaufe_ein(gamelink+"/city/supermarket/buy/",'POST',anz_alk_kaufen,"1","1","0.85","85","bier",anzahl_bier)
		},false);
		
		// eventlistener wodka trinken
		document.getElementById('wodka_trinken').addEventListener('click', function trinken(alk_alt){
		GM_setValue("anzahl_wodka_trinken", document.getElementById('anzahl_wodka_trinken').value);
		var alk_menge = GM_getValue("anzahl_wodka_trinken", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		mach_mich_besoffen(gamelink+"/stock/foodstuffs/use/",'POST',"Wodka","250","7",alk_menge,alk_alt)
		},false);
		
		// eventlistener wodka kaufen
		document.getElementById('wodka_kaufen').addEventListener('click', function kaufen(anzahl_wodka){
		GM_setValue("anzahl_wodka_kaufen", document.getElementById('anzahl_wodka_kaufen').value);
		var anz_alk_kaufen = GM_getValue("anzahl_wodka_kaufen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		kaufe_ein(gamelink+"/city/supermarket/buy/",'POST',anz_alk_kaufen,"7","1","10.00","1000","wodka",anzahl_wodka)
		},false);
		
		// eventlistener gluehwein trinken
		document.getElementById('gluehwein_trinken').addEventListener('click', function trinken(alk_alt){
		GM_setValue("anzahl_gluehwein_trinken", document.getElementById('anzahl_gluehwein_trinken').value);
		var alk_menge = GM_getValue("anzahl_gluehwein_trinken", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		mach_mich_besoffen(gamelink+"/stock/foodstuffs/use/",'POST',"xm_drink","80","10",alk_menge,alk_alt)
		},false);
		
		// eventlistener brot essen
		document.getElementById('brot_essen').addEventListener('click', function trinken(alk_alt){
		GM_setValue("anzahl_brot_essen", document.getElementById('anzahl_brot_essen').value);
		var brot_menge = GM_getValue("anzahl_brot_essen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		mach_mich_besoffen(gamelink+"/stock/foodstuffs/use/",'POST',"Brot","-35","2",brot_menge,alk_alt)
		},false);
		
		// eventlistener brot kaufen
		document.getElementById('brot_kaufen').addEventListener('click', function kaufen(anzahl_brot){
		GM_setValue("anzahl_brot_kaufen", document.getElementById('anzahl_brot_kaufen').value);
		var anz_brot_kaufen = GM_getValue("anzahl_brot_kaufen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		kaufe_ein(gamelink+"/city/supermarket/buy/",'POST',anz_brot_kaufen,"2","2","1.70","170","brot",anzahl_brot)
		},false);
		
		// eventlistener curry essen
		document.getElementById('curry_essen').addEventListener('click', function trinken(alk_alt){
		GM_setValue("anzahl_curry_essen", document.getElementById('anzahl_curry_essen').value);
		var brot_menge = GM_getValue("anzahl_curry_essen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		mach_mich_besoffen(gamelink+"/stock/foodstuffs/use/",'POST',"Currywurst","-100","3",brot_menge,alk_alt)
		},false);
		
		// eventlistener curry kaufen
		document.getElementById('curry_kaufen').addEventListener('click', function kaufen(anzahl_curry){
		GM_setValue("anzahl_curry_kaufen", document.getElementById('anzahl_curry_kaufen').value);
		var anz_brot_kaufen = GM_getValue("anzahl_curry_kaufen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		kaufe_ein(gamelink+"/city/supermarket/buy/",'POST',anz_brot_kaufen,"3","2","3.50","350","currywurst",anzahl_curry)
		},false);
		
		// eventlistener burger essen
		document.getElementById('hamburger_essen').addEventListener('click', function trinken(alk_alt){
		GM_setValue("anzahl_hamburger_essen", document.getElementById('anzahl_hamburger_essen').value);
		var brot_menge = GM_getValue("anzahl_hamburger_essen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		mach_mich_besoffen(gamelink+"/stock/foodstuffs/use/",'POST',"Hamburger","-200","4",brot_menge,alk_alt)
		},false);
		
		// eventlistener burger kaufen
		document.getElementById('hamburger_kaufen').addEventListener('click', function kaufen(anzahl_hamburger){
		GM_setValue("anzahl_hamburger_kaufen", document.getElementById('anzahl_hamburger_kaufen').value);
		var anz_brot_kaufen = GM_getValue("anzahl_hamburger_kaufen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		kaufe_ein(gamelink+"/city/supermarket/buy/",'POST',anz_brot_kaufen,"4","2","5.00","500","hamburger",anzahl_hamburger)
		},false);
		
		// eventlistener candys essen
		document.getElementById('candys_essen').addEventListener('click', function trinken(alk_alt){
		GM_setValue("anzahl_candys_essen", document.getElementById('anzahl_candys_essen').value);
		var brot_menge = GM_getValue("anzahl_candys_essen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		mach_mich_besoffen(gamelink+"/stock/foodstuffs/use/",'POST',"hw_candy","-200","9",brot_menge,alk_alt)
		},false);
		
		// eventlistener stollen essen
		document.getElementById('stollen_essen').addEventListener('click', function trinken(alk_alt){
		GM_setValue("anzahl_stollen_essen", document.getElementById('anzahl_stollen_essen').value);
		var brot_menge = GM_getValue("anzahl_stollen_essen", false);
		document.getElementById("cc_content").innerHTML = "<br><center>Aktion wird ausgef&uuml;hrt, Bitte warten .....<br>"+loadpic+"</center>";
		mach_mich_besoffen(gamelink+"/stock/foodstuffs/use/",'POST',"xm_food","-150","11",brot_menge,alk_alt)
		},false);
		
		//mach_mich_besoffen ( adresse , method , alk_name , alk_prommille , alk_id , alk_menge , alk_alt )
		
		//kaufe_ein ( adresse , method , anz_alk_kaufen , id , cat , preis , preis_cent , name , anzahl_bier )
		
}

// abfrage des bildungs status
function bildung_1(resp) {
	
	var content = resp.responseText;
	
	try {
	
	var w_end0 = content.split('bereits eine Weiterbildung')[1];
	var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
	var w_type1_stufe = w_end0.split('</span> [Stufe ')[1].split(']')[0];
	var start_time = content.split('var start = ')[1].split(';')[0];
	var end_time = content.split('var end = ')[1].split(';')[0];
	var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
	var end_date1 = new Date();
	end_date1.setTime(end_time * 1000);
	w_end_time = ((end_date1.getHours()<10)?'0'+end_date1.getHours():end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():end_date1.getMinutes());
	w_end_day = ((end_date1.getDate()<10)?'0'+end_date1.getDate():end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
	
	gesammt = end_time - start_time;
	bisher = timestamp_w - start_time;
	perc0 = (bisher / gesammt) * 100;
	if(perc0 > 0  && perc0 < 100) {
	width_balken0 = Math.round(perc0*10)/5;  
	percger0 = Math.round(perc0*10)/10; }
	
	var fortschrit = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_1\" style=\"width:"+width_balken0+"px; color:#ffffff;>"+percger0+"&#37;</div></div>";
	
	document.getElementById("cc_content").innerHTML = "<u><b>Bildung Penner:</b></u><br><br>Aktuelle Weiterbildung: <b>"+w_type1+" ["+w_type1_stufe+"]</b><br>Endet am <b>"+w_end_day+"</b> um <b>"+w_end_time+" Uhr</b>"+fortschrit+"<hr class=\"trenner\">";
	
	HTTP_REQ(""+gamelink+"/skills/",'GET',bildung_2)
	
	} catch(err) {

	document.getElementById("cc_content").innerHTML = "<u><b>Bildung Penner:</b></u><br><br>Aktuelle Weiterbildung: <b>KEINE !!!</b><br><b><a class=\"klickbar\" href=\""+gamelink+"/skills/\">Weiterbildung Starten</a></b><hr class=\"trenner\">";

	HTTP_REQ(""+gamelink+"/skills/pet/",'GET',bildung_tier)
	
	}
	
	
}
function bildung_2(resp) {
	
	var content = resp.responseText;
	
	try {
	
	var w_end_wait0 = content.split('in der Warteschlange')[1];
	var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
	var w_end_wait_stufe = w_end_wait0.split('</span> [Stufe ')[1].split(']')[0];
	var date_wait = content.split('<span class="style_skill">')[4].split('</span></div>')[0];
	
	document.getElementById("cc_content").innerHTML += "<hr class=\"trenner\">In Warteschlange: <b>"+w_end_wait+" ["+w_end_wait_stufe+"]</b><br>Endet am <b>"+date_wait+"</b><hr class=\"trenner\">";
	
	} catch(err) {
	
	document.getElementById("cc_content").innerHTML += "<hr class=\"trenner\">In Warteschlange: <b>Keine !!!</b><br><b><a class=\"klickbar\" href=\""+gamelink+"/skills/\">Weiterbildung Starten</a></b><hr class=\"trenner\">";
	
	}
	
	HTTP_REQ(""+gamelink+"/skills/pet/",'GET',bildung_tier)

}
function bildung_tier(resp) {
	
	var content = resp.responseText;
	
	try {
	
	var w_end0 = content.split('bereits eine Weiterbildung')[1];
	var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
	var w_type1_stufe = w_end0.split('</span> [Stufe ')[1].split(']')[0];
	var start_time = content.split('var start = ')[1].split(';')[0];
	var end_time = content.split('var end = ')[1].split(';')[0];
	var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
	var end_date1 = new Date();
	end_date1.setTime(end_time * 1000);
	w_end_time = ((end_date1.getHours()<10)?'0'+end_date1.getHours():end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():end_date1.getMinutes());
	w_end_day = ((end_date1.getDate()<10)?'0'+end_date1.getDate():end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
	
	document.getElementById("cc_content").innerHTML += "<br><u><b>Bildung Haustier:</b></u><br><br>Aktuelle Weiterbildung: <b>"+w_type1+" ["+w_type1_stufe+"]</b><br>Endet am <b>"+w_end_day+"</b> um <b>"+w_end_time+" Uhr</b><hr class=\"trenner\">";

	} catch(err) {

	document.getElementById("cc_content").innerHTML += "<br><u><b>Bildung Haustier:</b></u><br><br>Aktuelle Weiterbildung: <b>KEINE !!!</b><br><b><a class=\"klickbar\" href=\""+gamelink+"/skills/pet/\">Weiterbildung Starten</a></b><hr class=\"trenner\">";

	}
}

// updaterequest
function update_pruefung(resp,CurrentScriptVersion,xmlurl,downloadurl) {
	try{
	
	var neueversion = resp.responseText.split('<h3>Version:')[1].split('</h3>')[0];
	var updateinfos = resp.responseText.split('<h2>changelog</h2>')[1].split('<h2>/changelog</h2>')[0];
	
	var scripthomepage = "<a class=\"update_link\" href=\""+xmlurl+"\" target=\"_blank\">Scripthomepage</a>";
	var updateversion = "Aktuelle Version:"+CurrentScriptVersion+"<br>Updateversion:"+neueversion+"";
	var updateinformation = "Changelog:<br>"+updateinfos+"";
	
	
	} catch(err) {
	
	var neueversion = ""+CurrentScriptVersion+""
	
	var scripthomepage = "";
	var updateversion = "";
	var updateinformation = "<span style=\"color:red; font-weight:bold;\">Keine verbindung zum Updateserver!</span>";
	
	}

	if (CurrentScriptVersion != neueversion){
	var downloadlink = "<a class=\"update_link\" href=\""+downloadurl+"\">Update Installieren</a>";
	}else{
	var downloadlink = "";
	}
	
	var updatelinks = "<u><b>Scriptinfos</b></u><br><br> "+scripthomepage+" "+downloadlink+"";
	
	document.getElementById("cc_content").innerHTML = ""+updatelinks+"<hr class=\"trenner\">"+updateversion+"<hr class=\"trenner\"><div id=\"update_list\"><ul style=\"list-style-type:circle;\">"+updateinformation+"</ul></div>";
}

function update_anzeige(resp,CurrentScriptVersion,xmlurl) {
	
	try {
	var neueversion = resp.responseText.split('<h3>Version:')[1].split('</h3>')[0];
	} catch(err) {
	var neueversion = ""+CurrentScriptVersion+""
	}
	
	if (CurrentScriptVersion != neueversion){
	addGlobalStyle('div#cc_update { color:red; }')
	} else { }
	
}

// abfrage des bildungs status
function skill_pruefung(resp) {

	var content = resp.responseText;
	
	try {
	
	var w_end_wait0 = content.split('in der Warteschlange')[1];
	var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
	
	} catch(err) { try {
	
	addGlobalStyle('div#cc_bildung { color:red; }')
	
	var w_end0 = content.split('bereits eine Weiterbildung')[1];
	var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
	
	} catch(err) {
	
	addGlobalStyle('div#cc_bildung { color:red; text-decoration:blink;} }')
	
	}}
	
}

// plunder abfrage
function plunder(resp) {

		var content = resp.responseText;
		
		var plunder = content.split('<h4>')[1].split('</h4>')[0];
		var wert = content.split('<ul class="zclear">')[1].split('</ul>')[0];
		
		document.getElementById("cc_content").innerHTML = "<u><b>Plunder</b></u><br><br>"+plunder+"<br>"+wert+"";

}

// function fuer datenabfrage
function HTTP_REQ(adresse,method,callback,id1,id2,id3,id4,id5,id6,id7,id8,id9) {
   GM_xmlhttpRequest({
      url:adresse,
      method:method,
      onload: function (responseDetails) {
         callback(responseDetails,id1,id2,id3,id4,id5,id6,id7,id8,id9);
      }
   });
}

// function waschen
function mach_mich_sauber(adresse,method,clean_id,clean_old){
	GM_xmlhttpRequest({
		url:adresse,
		method:method,
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('id='+clean_id),
			onload: function(responseDetails){
			
			var content = responseDetails.responseText;
			
			var clean_new = content.match(/Sauberkeit:.*>(\d+)</);
			var clean_new = RegExp.$1;
			
			if(clean_old != clean_new){
			document.getElementById("cc_content").innerHTML = "<br><center><span style=\"color:green;\">Aktion erfolgreich.</span><br>Seite wird neu geladen.</center>";
			window.setTimeout(location.reload(), 3000);
			} else {
			document.getElementById("cc_content").innerHTML = "<br><center><span style=\"color:red;\">Aktion NICHT erfolgreich.</span></center>";
			}
			
			}
		 });					
}

// function trinken / essen
function mach_mich_besoffen(adresse,method,alk_name,alk_prommille,alk_id,alk_menge,alk_alt){
	GM_xmlhttpRequest({
		url:adresse,
		method:method,
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('item='+alk_name+'&promille='+alk_prommille+'&id='+alk_id+'&menge='+alk_menge),
			onload: function(responseDetails){
			
			var content = responseDetails.responseText;
			
			var split_1 = content.split('icon beer')[1].split('</li>')[0];
			var Pos = split_1.indexOf(".");
			var split_2 = split_1.substr(Pos - 1, 4);
			var Alk = split_2.replace(".", "");
			
			if(alk_alt != Alk){
			document.getElementById("cc_content").innerHTML = "<br><center><span style=\"color:green;\">Aktion erfolgreich.</span><br>Seite wird neu geladen.</center>";
			window.setTimeout(location.reload(), 3000);
			} else {
			document.getElementById("cc_content").innerHTML = "<br><center><span style=\"color:red;\">Aktion NICHT erfolgreich.</span></center>";
			}
			
}
});					
}

// fuction kaufen
function kaufe_ein(adresse,method,anz_alk_kaufen,id,cat,preis,preis_cent,name,anzahl_bier){
	GM_xmlhttpRequest({
   		 url:adresse,
		 method:method,
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('menge='+anz_alk_kaufen+'&id='+id+'&cat='+cat+'&preis='+preis+'&preis_cent='+preis_cent+'&inventar_name='+name+'&submitForm=F%C3%BCr+%E2%82%AC1%2C70+kaufen'),
			onload: function(responseDetails){
			
			var content = responseDetails.responseText;
			
			var anzahl_bier_neu = content.split('<span>')[1].split(' Flaschen')[0];
			
			if(anzahl_bier != anzahl_bier_neu){
			document.getElementById("cc_content").innerHTML = "<br><center><span style=\"color:green;\">Aktion erfolgreich.</span><br>Seite wird neu geladen.</center>";
			window.setTimeout(location.reload(), 3000);
			} else {
			document.getElementById("cc_content").innerHTML = "<br><center><span style=\"color:red;\">Aktion NICHT erfolgreich.</span></center>";
			}
			
}
});
}