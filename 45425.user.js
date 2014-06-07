// ==UserScript==
// @name           DS - PA
// @namespace      Deutsch
// @description    Kostenlose Zusatzfunktionen für Die Stämme.
// @include        http://*.die-staemme.de/*
// ==/UserScript==

// Aktuell installierte Version:
var vers_ist = 'DS - PA 0.3.1';

// Aktueller Dateipfad:
var url = document.location.href;

// Welt:
var welt = url.split('.')[0].replace('http://de', '');

// Dorf-ID:
var dorf_ID = url.split('village=')[1].split('&')[0];

// Aktuelles Datum:
var jetzt = new Date();
var tag = jetzt.getDate();
var monat = jetzt.getMonth()+1;
var jahr = jetzt.getFullYear();
var heute = tag + '.' + monat + '.' + jahr;

// Auf Aktualisierung prüfen:
if (GM_getValue('Check-Datum') != heute) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://userscripts.org/scripts/show/45425',
        onload: function(responseDetails) {
            var check = responseDetails.responseText.split(' for Greasemonkey</title>');
            vers_akt = check[0].split('<title>');
            GM_setValue('vers_akt', vers_akt[1]);
        }
    });

    // Ist die Version noch aktuell?
    if((GM_getValue('vers_akt') != vers_ist) && (GM_getValue('vers_akt') != null)) {
        // Installations-Link in Menüleiste einbauen:
        document.getElementById('menu_row2').innerHTML += '<td>| <a href="http://userscripts.org/scripts/source/45425.user.js" target="_blank" title="' + GM_getValue('vers_akt') + ' installieren"><img src="http://de' + welt + '.die-staemme.de/graphic/new_report.png" /> <b style="color:#C00; text-decoration:blink;">Neu!</b></a></td>';
    }
}

//Werbung entfernen (muss als erstes gemacht werden, dass "Hauptframe" definiert werden kann):
if(parent.document.getElementsByTagName('frameset')[0]){
 if(parent.document.getElementsByTagName('frameset')[0].cols){
      parent.document.getElementsByTagName('frameset')[0].cols = '*, 0';
 } else if(parent.document.getElementsByTagName('frameset')[0].rows){
     parent.document.getElementsByTagName('frameset')[0].rows = '0, *';
 }
}

// Body:
var body = document.getElementById('ds_body');

// PA-Info:
var pa = 0;
if (body.getElementsByClassName('quickbar')[0] != null) {
    pa = 1;
}

//Wenn kein PA vorhanden.
if (pa == 0) {
    // Quickbar erstellen:
    var quickbardata = '';
    var quickbar = document.createElement('table');
    quickbar.style.margin = '0 auto';
    quickbardata += '<br /><tr><td><table class="navi-border" style="border-collapse: collapse;"><tr><td>';
    quickbardata += '<ul class="menu nowrap quickbar" style="text-align:center;">';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=main"><img src="graphic/buildings/main.png" alt="Hauptgebäude" />Hauptgebäude</a></span></li>';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=barracks"><img src="graphic/buildings/barracks.png" alt="Kaserne" />Kaserne</a></span></li>';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=stable"><img src="graphic/buildings/stable.png" alt="Stall" />Stall</a></span></li>';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=garage"><img src="graphic/buildings/garage.png" alt="Werkstatt" />Werkstatt</a></span></li>';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=snob"><img src="graphic/buildings/snob.png" alt="Adelshof" />Adelshof</a></span></li>';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=smith"><img alt="Schmiede" src="graphic/buildings/smith.png"/>Schmiede</a></li>';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=place"><img src="graphic/buildings/place.png" alt="Platz" />Platz</a></span></li>';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=statue"><img src="graphic/buildings/statue.png" alt="Statue" />Statue</a></span></li>';
    quickbardata += '<li><a href="game.php?village='+dorf_ID+'&amp;screen=market"><img src="graphic/buildings/market.png" alt="Marktplatz" />Markt</a></span></li>';
    quickbardata += '</ul>';
    quickbardata += '</td></tr></table></td></tr>';
    quickbar.innerHTML = quickbardata;
    body.insertBefore(quickbar, body.getElementsByTagName('hr')[0]);

    // Dörfer lesen und ausgeben (Schneller Dorfwechsel und Dorfliste).
    var screen = url.split('screen=')[1].split('&')[0];

    if (screen == 'overview_villages') {
        var arrvillages = new Array();
        var arrvillages_name = new Array();
        var objects = body.getElementsByClassName('vis')[0].getElementsByClassName('nowrap');
        var x = 0;
        for each (var item in objects) {
            arrvillages[x] = item.innerHTML.split('"')[1].split('label_')[1];
            arrvillages_name[x] = item.innerHTML.split('span')[2].split('>')[1].split('<')[0];
            x++;
        }
        
        x = 0;
        for each (var item in arrvillages) {
            GM_setValue(welt + 'villages_' + x, item);
            GM_setValue(welt + 'villages_name_' + x, arrvillages_name[x]);
            x++;
        }
        
        GM_setValue(welt + 'villages_length', arrvillages.length);
    }
    
    var villages = new Array();
    var villages_name = new Array();
    var villages_length = GM_getValue(welt + 'villages_length');
    var villages_list = '<td><img src="graphic/villages.png"/><table width="120" cellspacing="0" class="menu_column">';
    for (var z = 0; z < villages_length; z++) {
        villages[z] = GM_getValue(welt + 'villages_' + z);
        villages_name[z] = GM_getValue(welt + 'villages_name_' + z);
        villages_list += '<tr><td><a href="game.php?village=' + villages[z] + '&screen=' + screen + '">' + villages_name[z] + '</a></td></tr>';
    }
    villages_list += '</table></td>';
    document.getElementById('menu_row2').innerHTML += villages_list;

    var next = 0;
    var active = 0;
    var past = 0;
    var y = 0;
    
    for each (var item in villages) {
        if (active != 0) {
            next = item;
            active = y;
            break;
        }
        if (dorf_ID == item) {
            active = item;
        }
        y++;
    }

    active = active - 2;
    if (active >= 0 && villages[active] != dorf_ID) {
        past = villages[active];
    }

    var quickchangedata = '';

    if (villages[active] == undefined && villages[0] != dorf_ID) {
        x = villages.length - 2;
        quickchangedata += '<a href="game.php?village=' + villages[x] + '&screen=' + screen + '"><img src="graphic/links.png" /></a> ';
    } else {
        if (past == 0 || past == undefined) {
            x = villages.length - 1;
            quickchangedata += '<a href="game.php?village=' + villages[x] + '&screen=' + screen + '"><img src="graphic/links.png" /></a> ';
        } else {
            quickchangedata += '<a href="game.php?village=' + past + '&screen=' + screen + '"><img src="graphic/links.png" /></a> ';
        }
    }
    
    if (next == 0 || next == undefined) {
        quickchangedata += '<a href="game.php?village=' + villages[0] + '&screen=' + screen + '"><img src="graphic/rechts.png" /></a>';
    } else {
        quickchangedata += '<a href="game.php?village=' + next + '&screen=' + screen + '"><img src="graphic/rechts.png" /></a>';
    }
    
    body.getElementsByClassName('no_hover')[0].innerHTML = quickchangedata;
    
    // Quickmenüs erstellen.
    var quickmenu = '';
    var ids = new Array('8', '7', '6', '5', '4', '3');
    var menus = new Array('settings', 'premium', 'ranking', 'ally', 'report', 'mail');
    var links = new Array(
        new Array('profile', 'email', 'settings', 'move', 'delete', 'share', 'vacation', 'logins', 'change_passwd', 'poll', 'ref'),
        new Array('help', 'premium', 'points', 'transfer', 'log', 'free'),
        new Array('ally', 'player', 'con_ally', 'con_player', 'kill_player', 'kill_ally'),
        new Array('overview', 'profile', 'members', 'contracts', 'forum'),
        new Array('all', 'attack', 'defense', 'support', 'trade', 'other', 'forwarded', 'filter', 'block', 'public'),
        new Array('in', 'mass_out', 'new', 'block')
    );
    var names = new Array(
        new Array('Profil', 'E-Mail-Adresse', 'Einstellungen', 'Neu anfangen', 'Account löschen', 'Internetverbindung teilen', 'Urlaubsmodus', 'Logins', 'Passwort ändern', 'Umfragen', 'Spieler werben'),
        new Array('Vorteile', 'Kaufen', 'Einsetzen', 'Übertragen', 'Protokoll', 'Gratis PA'),
        new Array('Stämme', 'Spieler', 'Kontinent Stämme', 'Kontinent Spieler', 'Besiegte Gegner', 'Besiegte Gegner Stämme'),
        new Array('Übersicht', 'Profil', 'Mitglieder', 'Diplomatie', 'Stammesforum'),
        new Array('Alle Berichte', 'Angriffe', 'Verteidigung', 'Unterstützung', 'Handel', 'Sonstiges', 'Weitergeleitet', 'Filter', 'Absender blockieren', 'Öffentliche Berichte'),
        new Array('Nachrichten', 'Rundschreiben', 'Nachricht schreiben', 'Absender blockieren')
    );

    y = 5;
    for each (var item1 in ids) {
        quickmenu = '<table width="120" cellspacing="0" class="menu_column">';
        x = 0;
        for each(var item2 in links[y]) {
            quickmenu += '<tr><td><a href="game.php?village=' + dorf_ID + '&screen=' + menus[y] + '&mode=' + item2 + '">' + names[y][x] + '</a></td></tr>';
            x++;
        }
        quickmenu += '</table>';
        document.getElementById('menu_row').getElementsByTagName('td')[item1].innerHTML += quickmenu;
        y--;
    }

}


// =================================================================
// Übersichtsformatierer by Roman-S.
// http://userscripts.org/scripts/show/41116
// =================================================================

// PA-Info:
var info = 0;

var test1 = "";
var test2 = "";

test1 = document.getElementById("overview");

if(test1 == null) {
    // Ohne PA:
    info = 1;
} else {
    // Mit PA:
    test2 = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[0].getElementsByClassName("selected")[0].getElementsByTagName("a")[0].innerHTML;
    if(test2 == "Produktion") {
        info = 2;
    }
}

// Nur in der Dörferübersicht anwenden:
if(url.match(/screen=overview$/)) {
	var vis = document.getElementsByClassName("vis").length-1;
	var Stunde = new Date().getHours();
	var test = "";
	var zustimmung = 100;
	for(v=0; v<=vis; v++) {
		test = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[0].innerHTML;
		if(test.match(/Zustimmung/)) {
			zustimmung = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[1].innerHTML;
		}
	}

	GM_setValue("Stunde-" + dorf_ID, Stunde);
	GM_setValue("Zustimmung-" + dorf_ID, zustimmung);
}

// Nur in der Dörferübersicht anwenden:
if(url.match(/screen=overview_villages/)) {

	var test1 = "";
	var test2 = "";

	test1 = document.getElementById("overview");


	// Ohne PA:
	if(test1 == null) {
		info = 1;
	}
	// Mit PA:
	else {
		test2 = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[0].getElementsByClassName("selected")[0].getElementsByTagName("a")[0].innerHTML;
		if(test2 == "Produktion") {
			info = 2;
		}
	}


   	if(info >= 1) {
		// Anzahl der Tabellen ermitteln:
		var main = document.getElementsByClassName("main").length-1;
		var vis = document.getElementsByClassName("main")[main].getElementsByTagName("table").length;
		var kopf = "";


		// Tabelle auswählen:
		if(info == 1) {
			if(vis > 1) {
				vis = vis -2;
			}
			else {
				vis = 0;
			}
		}


		if(info == 2) {
			if(vis >= 4) {
				vis = vis -2;
			}
			else {
				vis = vis -1;
			}
		}


		// Anzahl der Spalten ermitteln:
		var spalten = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[0].getElementsByTagName("th").length;

		// Anzahl der Zeilen ermitteln:
		var zeilen = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr").length;
		// kopf:
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px;'>Dorf</th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px;'>Punkte</th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topright:10px;'><img src='http://de33.die-staemme.de/graphic/ally_rights/lead.png' title='Zustimmung'></th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px;'><img src='/graphic/holz.png' title='Holz' alt='' /></th><th style='text-align:center; -moz-border-radius-topright:10px;'>Holz</th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px;'><img src='/graphic/lehm.png' title='Lehm' alt='' /></th><th style='text-align:center; -moz-border-radius-topright:10px;'>Lehm</th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px;'><img src='/graphic/eisen.png' title='Eisen' alt='' /></th><th style='text-align:center; -moz-border-radius-topright:10px;'>Eisen</th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px;'><img src='/graphic/res.png' title='Speicher' alt='' /></th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topright:10px;'>Max.</th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px;'><img src='/graphic/face.png' title='Bauernhof' alt='' /></th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topright:10px;'>Bauernhof</th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topleft:10px;'><img src='/graphic/gold.png' title='Goldmünzen' alt='' /></th>";
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; -moz-border-radius-topright:10px;'><img src='/graphic/unit/unit_snob.png' title='Adelsgeschlechter' alt='' /></th>";
		if(info == 2) {
			kopf += "<th style='text-align:center; padding:2px; -moz-border-radius-topleft:10px;'>Bauauftrag</th>";
			kopf += "<th style='text-align:center; padding:2px;'>Forschung</th>";
			kopf += "<th style='text-align:center; padding:2px; -moz-border-radius-topright:10px;'>Rekrutierung</th>";
		}
		// kopf aktualisieren:
		document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[0].innerHTML = kopf;

		var gold_gesamt = 0;
		var snob_gesamt_1 = 0;
		var snob_gesamt_2 = 0;

		// Zeilen:
		for(i=1; i<=zeilen; i++) {
			// Neue Zeile:
			var zeile = "";
			// Werte aus Zeile auslesen:
			var dorf = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
			var dorf_link = dorf.split("village=");
			var dorf_id = dorf_link[1].split("&");

			var punkte = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML;
			if(GM_getValue("Zustimmung-" + dorf_id[0]) != undefined) {
				var std_1 = GM_getValue("Stunde-" + dorf_id[0]);
				var std_2 = new Date().getHours();
				var stunden = std_2 - std_1;
				var zustimm = (GM_getValue("Zustimmung-" + dorf_id[0])*1)+(stunden*1);
				if(zustimm <= 100) {
					var zustimmung = zustimm;
				}
				else {
					var zustimmung = 100;
				}
			}
			else {
				var zustimmung = "<span class='grey'>100</span>";
			}
			var rohstoffe = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML;
			var rohstoff = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML.split("<img");
			var speicher = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML;
			var bauernhof = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[4].innerHTML.split("/");
			if(info == 2) {
				for(z=5; z<=7; z++) {
					var bilder = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[z].getElementsByTagName("img").length;
					for(b=0; b<bilder; b++) {
						document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[z].getElementsByTagName("img")[b].setAttribute("style", "height:14px; margin-left:2px;");
					}
				}

				var ba = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[5].innerHTML.split("<br>")[1];
				if(ba != undefined) {
					var bauauftrag = "<small> " + ba + "</small>";
				}
				else {
					var bauauftrag = "";
				}
				var forschung = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[6].innerHTML;
				var rekrutierung = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[7].innerHTML;
			}


			// Werte extrahieren:
			var holz = rohstoff[1].split("\"\">");
			var lehm = rohstoff[2].split("\"\">");
			var eisen = rohstoff[3].split("\"\">");


			// Werte umwandeln:
			var wert_h = holz[1];
			var wert_l = lehm[1];
			var wert_e = eisen[1];

			// Code by -- Tera
			wert_h = wert_h.replace(/SPAN/gi,"span");
			wert_l = wert_l.replace(/SPAN/gi,"span");
			wert_e = wert_e.replace(/SPAN/gi,"span");


			var w_h = wert_h.replace("<span class=\"grey\">.</span>", "").replace("<span class=\"warn\">", "").replace("</span>", "");
			var w_l = wert_l.replace("<span class=\"grey\">.</span>", "").replace("<span class=\"warn\">", "").replace("</span>", "");
			var w_e = wert_e.replace("<span class=\"grey\">.</span>", "").replace("<span class=\"warn\">", "").replace("</span>", "");


			// Farben:
			var colorR = 0;
			var colorG = 255;
			var stufen = 100;
			var teile = 100/stufen;
			var schritt = Math.round(255/stufen)-1;
			var hgFarbe = new Array();


			// Farbabstufungen:
			for(c=0; c<=stufen; c++) {
				var farbeR = (colorR + schritt * c).toString(16);
				var farbeG = (colorG - schritt * c).toString(16);

				if(farbeR.length == 1) {
					farbeR = "0" + farbeR;
				}
				if(farbeG.length == 1) {
					farbeG = "0" + farbeG;
				}

				hgFarbe[c] = "#" + farbeR + farbeG + "00";
			}


			// Prozentuale Werte ermitteln:
			var proz_h = Math.round((100/speicher)*w_h);
			var proz_l = Math.round((100/speicher)*w_l);
			var proz_e = Math.round((100/speicher)*w_e);

			var pro_h = Math.round(proz_h/teile);
			var pro_l = Math.round(proz_l/teile);
			var pro_e = Math.round(proz_e/teile);


			var gold_holz = w_h - (w_h%28000);
			var gold_lehm = w_l - (w_l%30000);
			var gold_eisen = w_e - (w_e%25000);

			var snob_holz = w_h - (w_h%40000);
			var snob_lehm = w_l - (w_l%50000);
			var snob_eisen = w_e - (w_e%50000);

			var gold = Math.min(Math.min(gold_holz/28000,gold_lehm/30000),gold_eisen/25000);
			var snob = Math.min(Math.min(snob_holz/40000,snob_lehm/50000),snob_eisen/50000);

			// Zeile neu zusammen setzen:
			zeile += "<td style='padding-left:5px; padding-right:5px;'>" + dorf + "</td>";
			zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px;'>" + punkte + "</td>";
			zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px;'><small>" + zustimmung + "</small></td>";
			zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; background-color:" + hgFarbe[pro_h] + "' title='Holz: " + proz_h + "%'><small>" + proz_h + "%</small></td>";
			zeile += "<td style='text-align:right; padding-right:5px' title='Holz: " + proz_h + "%'>" + wert_h + "</td>";
			zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; background-color:" + hgFarbe[pro_l] + "' title='Lehm: " + proz_l + "%'><small>" + proz_l + "%</small></td>";
			zeile += "<td style='text-align:right; padding-right:5px' title='Lehm: " + proz_l + "%'>" + wert_l + "</td>";
			zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; background-color:" + hgFarbe[pro_e] + "' title='Eisen: " + proz_e + "%'><small>" + proz_e + "%</small></td>";
			zeile += "<td style='text-align:right; padding-right:5px' title='Eisen: " + proz_e + "%'>" + wert_e + "</td>";

			zeile += "<td colspan='2' style='text-align:right; padding-left:5px; padding-right:5px;'>" + (speicher/1000 ).toFixed(3) + "</td>";
			zeile += "<td colspan='2' style='text-align:right; padding-left:5px; padding-right:5px;'>" + (bauernhof[0]/1000 ).toFixed(3) + " <span class=\"grey\">/</span> " + (bauernhof[1]/1000 ).toFixed(3) + "</td>";

			var plus_gold = "";
			var plus_snob = "";

			if(gold > 1) {
				plus_gold = "n";
			}

			if(gold > 0) {
				gold_gesamt += gold;
				zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px;' title='Du kanst " + gold + " GoldmÃƒÆ’Ã‚Â¼nze" + plus_gold + " prÃƒÆ’Ã‚Â¤gen'><a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id[0] + "&screen=snob'>" + gold + "</a></td>";
			}
			else {
				zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px;' title='Du kanst momentan keine GoldmÃƒÆ’Ã‚Â¼nze prÃƒÆ’Ã‚Â¤gen'><span class='grey'>" + gold + "</span></td>";
			}

			if(snob > 0) {
				snob_gesamt_1 += snob;
				var volk_rest = (bauernhof[1] - bauernhof[0]);
				var volk_soll = (snob * 200);

				var max_snob = Math.round(volk_rest/200);

				if(max_snob > 1) {
					plus_snob = "er";
				}

				if(max_snob >= 1) {
					snob_gesamt_2 += snob;
					if(max_snob < snob){
						zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px;' title='Du kanst " + max_snob + " von " + snob + " Adelsgeschlechtern produzieren'><a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id[0] + "&screen=snob'>" + max_snob + "</a><span class='grey'>/" + snob + "</span></td>";
					}
					else {
						zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px;' title='Du kanst " + snob + " Adelsgeschlecht" + plus_snob + " produzieren'><a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id[0] + "&screen=snob'>" + snob + "</a><span class='grey'>/" + snob + "</span></td>";
					}
				}
				else {
					zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px;;' title='Der Bauernhof kann keine weiteren Einheiten versorgen'><span class='grey'>0/" + snob + "</span></td>";
				}
			}
			else {
				zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px;' title='Es können keine weiteren Adelsgeschlechter produziert werden'><span class='grey'>" + snob + "</span></td>";
			}

			if(info == 2) {
				zeile += "<td style='text-align:left; padding:2px;'>" + bauauftrag + "</td>";
				zeile += "<td style='text-align:left; padding:2px;'>" + forschung + "</td>";
				zeile += "<td style='text-align:left; padding:2px;'>" + rekrutierung + "</td>";
			}


			// Inhalt der Zeile aktualisieren:
			document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].innerHTML = zeile;
			if(i == zeilen-1) {
				if(snob_gesamt_2 != 1) {
					plus_snob = "er";
				}

				if(snob_gesamt_2 > 1) {
					plus_snob = "ern";
				}

				var inhalt = "";
				inhalt += "<tr>";
				inhalt += "<th colspan='3' style='text-align:center; padding:2px; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>Allgemeine Infos</th>";
				inhalt += "<th colspan='6' style='text-align:center; padding:2px; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'><b style='color:" + hgFarbe[10] + ";'>R</b><b style='color:" + hgFarbe[20] + ";'>e</b><b style='color:" + hgFarbe[30] + ";'>s</b><b style='color:" + hgFarbe[40] + ";'>s</b><b style='color:" + hgFarbe[50] + ";'>o</b><b style='color:" + hgFarbe[60] + ";'>u</b><b style='color:" + hgFarbe[70] + ";'>r</b><b style='color:" + hgFarbe[80] + ";'>c</b><b style='color:" + hgFarbe[90] + ";'>e</b><b style='color:" + hgFarbe[100] + ";'>n</th>";
				inhalt += "<th colspan='2' style='text-align:center; padding:2px; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>Speicher</th>";
				inhalt += "<th colspan='2' style='text-align:center; padding:2px; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>Bevölkerung</th>";
				inhalt += "<th style='text-align:right; padding-left:5px; padding-right:5px; -moz-border-radius-bottomleft:10px;' title='Du kannst insgesamt " + gold_gesamt + " Goldmünze" + plus_gold + " prägen'>" + gold_gesamt + "</th>";
				if(snob_gesamt_1 != snob_gesamt_2) {
					inhalt += "<th style='text-align:right; padding-left:5px; padding-right:5px; -moz-border-radius-bottomright:10px;' title='Du kannst maximal " + snob_gesamt_2 + " von " + snob_gesamt_1 + " Adelsgeschlecht" + plus_snob + " produzieren'>" + snob_gesamt_2 + "<span class='grey'>/" + snob_gesamt_1 + "</span></th>";
				}
				else {
					inhalt += "<th style='text-align:right; padding-left:5px; padding-right:5px; -moz-border-radius-bottomright:10px;' title='Du kannst maximal " + snob_gesamt_2 + " Adelsgeschlecht" + plus_snob + " produzieren'>" + snob_gesamt_2 + "</th>";
				}
				if(info == 2) {
					inhalt += "<th colspan='3' style='text-align:center; padding:2px; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>Aufträge</th>";
				}

				inhalt += "</tr>";
				document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].innerHTML += inhalt;

				// Das aktuelle Dorf hervorheben:
				var tabelle = document.getElementsByClassName("vis")[vis];
				var dorf_ist = document.getElementById("menu_row2").getElementsByTagName("a")[2].innerHTML;
				var zellen = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("td").length;
				for(x=1; x<zeilen; x++) {
					var dorf_list = tabelle.getElementsByTagName("tr")[x].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML.split(" (")[0];
					if(dorf_list == dorf_ist) {
						tabelle.getElementsByTagName("tr")[x].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute("style", "color:#C00;");
					}
				}
			}
		}
	}
}
