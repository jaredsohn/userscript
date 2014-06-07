// ==UserScript==
// @name          DS Autofarm v2.1
// @description   Vollautomatisches Farmen von verlassenen Doerfern in "Die Staemme". Bitte lese unbedingt auch die Beschreibung im Quellcode.
// @include       http://*.die-staemme.de/game.php*
// @include       http://*.staemme.ch/game.php*
// ==/UserScript==


/*

*******************************
*** DS Autofarm Version 2.1 ***
*******************************

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!! Dieses Script soll nur die phantastischen Moeglichkeiten von Scripting   !!!
!!! mit Greasemonkey demonstrieren. Eine tatsaechliche Verwendung wuerde     !!!
!!! hoechstwarscheinlich gegen die Spielregeln von "Die Staemme" verstossen. !!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Dieses Script realisiert vollautomatisches Farmen von verlassenen Doerfern in
"Die Staemme".

Auf der Uebersichtsseite erscheint ein gruener oder roter Link mit dem Text
"Autofarm Starten" oder "Autofarm Stoppen". Damit kann man das Autofarmen ein-
und ausschalten.

WICHTIGE HINWEISE:

* Waehrend das Autofarmen eingeschaltet ist, darf man in keinem anderen Fenster
  irgendwelche Web-Seiten von DS anschauen. Wann immer man also etwas in DS
  anschauen oder machen will, muss man das Autofarmen abschalten!

* Das Autofarmen funktioniert nur mit Premium-Account.

* Man sollte die Karte auf 15x15 eingestellt haben (geht nur mit PA), denn das
  Autofarmen sucht sich dort die Farmen.

* Jeder Angriff erfolgt mit 1 Spaeher und etwa 100 Leichte Kavallerie. Durch
  Klicken auf den Link "Einstellen" neben "Autofarm Starten" können diese Zahlen
  verändert werden. Die angegebene Anzahl Leichte Kavallerie ist nur ein
  Idealwert. Der Algorithmus weicht davon ggf. um Faktor 0,5 bis 1,75 ab, um
  möglichst alle Leichte Kavallerie Einheiten zu beschäftigen.

* Seit Version 1.3 wird menschliches Verhalten so gut wie moeglich simuliert,
  und daher wartet das Script zum Teil etwas laenger als noetig, bevor die
  jeweils naechste Aktion ausgefuehrt wird. Eine intensive Nutzung des Scripts
  wuerde aber sicherlicht trotzdem auffallen.

Wie das Autofarmen arbeitet: Zunaechst laedt das Script die kombinierte
Uebersichtsseite. Dort schaut es nach ob ein Dorf genuegend Einheiten bereit
stehen hat. Falls nicht dann wartet das Script indem es die Uebersichtsseite
nach einiger Zeit neu laedt. Sind genuegend Einheiten bereit, so laedt das
Script zunaechst das entsprechende eigene Dorf und dann die Karte mit dem Dorf
in der Mitte. Auf jenem Kartenausschnitt wird dann ein geeignetes Dorf zum
Farmen ausgesucht, und zwar anhand verschiedener Kriterien. Es ist auf jeden
Fall ein verlassenes Dorf und es ist eines der Doerfer die am laengsten nicht
gefarmt worden sind. Zudem werden Doerfer bevorzugt, die eine hohe Punktzahl
haben, die beim letzten mal keine Verluste ergaben, oder die beim letzten mal
nicht vollstaendig leer geraeumt wurden. Es ist auch ein bisschen Zufall dabei.
Auf keinen Fall wird ein Dorf genommen beim dem der letzte Angriff ein Verlierer
war (roter Punkt im Popup). Schliesslich wird das auserkorene Dorf angegriffen,
durch Laden der entsprechenden Seiten. Am Ende laedt das Script dann wieder die
kombinierte Uebersichtsseite und der Mechanismus beginnt von vorn.

original by dspro
fixed by magnifier512
*/

(function(){

var MIN_RELOAD_SECS = 90;
var MAX_RELOAD_SECS = 900;
// GM_log(document.cookie);
// GM_log("off1")
function my_throw(x)
{
	GM_log(x);
	throw(x);
}

var spysPerAttack = parseInt(GM_getValue("autfarm-spys", 1));
var lkavsPerAttack = parseInt(GM_getValue("autfarm-lkavs", 100));
if (document.cookie.indexOf("autofarm=setup") >= 0) {
	document.cookie = 'autofarm=off';
	document.cookie = 'autofarm_run=0';
	var x = prompt("Anzahl Spaeher pro Angriff:", spysPerAttack);
	if (x) {
		var y = prompt("Ideale Anzahl Leichte Kavallerie pro Angriff:", lkavsPerAttack);
		if (y) {
			x = parseInt(x); if (x < 0) x = 0;
			y = parseInt(y); if (y < 0) y = 0;
			if (!x && !y) x = 1;
			GM_setValue("autfarm-spys", x);
			GM_setValue("autfarm-lkavs", y);
			location.reload();
		}
	}
}

var autofarm_on = false;
if (document.cookie.indexOf("autofarm=on") >= 0 &&
	(document.cookie.indexOf("autofarm_run=0") >= 0 || document.cookie.indexOf("autofarm_run=off") >= 0)) {
	autofarm_on = true;
	document.cookie = 'autofarm_run=off';
}

var tables = document.getElementsByTagName('table');
var table_cb = null;
for (var i = 0; i < tables.length; i++) {
	if (tables[i].className == 'content-border') {
		table_cb = tables[i];
		break;
	}
}

var village_id = /village=(\d+)/.exec(location.href);
if (village_id && village_id.length == 2)
	{village_id = village_id[1];}
else {
	village_id = null;
	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		if (trs[i].id == 'menu_row2') {
			var as = trs[i].getElementsByTagName('a');
			for (var j = 0; j < as.length; j++) {
				if (/screen=map/.test(as[j].href)) {
					var id = /village=(\d+)/.exec(as[j].href);
					if (id && id.length == 2) {
						village_id = id;
						break;
					}
				}
			}
			break;
		}
	}
}

if (
	village_id != null && table_cb != null &&
	!autofarm_on && /screen=overview_villages/.test(location.href)
) {
	var newElement = document.createElement('p');
	newElement.innerHTML =
		'<A HREF="javascript:document.cookie=\'autofarm=on\';' +
		'document.cookie=\'autofarm_run=0\';'+
		'location.href=\'staemme.php?village=' +
		village_id +
		'&screen=overview_villages&mode=combined\';"' +
		'><FONT color=#00ff00>Autofarm Starten</FONT></A>&nbsp;&nbsp;' +
		'<A HREF="javascript:document.cookie=\'autofarm=setup\';' +
		'location.reload()">(Einstellen)</A>'
	;
	table_cb.parentNode.insertBefore(newElement, table_cb);
}
else if (
	village_id != null && table_cb != null && autofarm_on &&
	document.cookie.indexOf("autofarm_run=off") >= 0
) {
	var newElement = document.createElement('p');
	newElement.innerHTML =
		'<A HREF="javascript:document.cookie=\'autofarm=off\';' +
		'location.reload()"><FONT color=#ff0000>Autofarm Stoppen</FONT></A>'
	;
	table_cb.parentNode.insertBefore(newElement, table_cb);
	if (
		/screen=overview_villages/.test(location.href) &&
		/mode=combined/.test(location.href)
	) {
		var dtbl = null;
		for(var i = 0, j = 0; i < tables.length; i++) {
			if (tables[i].className == 'vis') {
				if (j == 2) dtbl = tables[i];
				j++;
			}
		}
		if (dtbl != null) {
			window.setInterval(
				"location.reload()",
				Math.floor(1000 * (MIN_RELOAD_SECS + Math.random() * (MAX_RELOAD_SECS - MIN_RELOAD_SECS)))
			);
			var trs = dtbl.getElementsByTagName('tr');
			var ths = trs[0].getElementsByTagName('th');
			var spys_idx = -1;
			var lkavs_idx = -1;
			for (var i = 0; i < ths.length; i++) {
				if (ths[i].innerHTML.indexOf('unit_spy.png') >= 0) {
					spys_idx = i;
				}
				if (ths[i].innerHTML.indexOf('unit_light.png') >= 0) {
					lkavs_idx = i;
				}
			}
			if (spys_idx >= 0 && lkavs_idx >= 0) {
				for (var i = 1; i < trs.length; i++) {
					var vllg = trs[i].getElementsByTagName('span')[0].id.substr(6);
					var tds = trs[i].getElementsByTagName('td');
					var spys = parseInt(tds[spys_idx].innerHTML);
					var lkavs = parseInt(tds[lkavs_idx].innerHTML);
					if (spys >= spysPerAttack && lkavs >= lkavsPerAttack / 2) {
						window.setInterval(
							"location.href='staemme.php?village=" + vllg + "&screen=overview'",
							Math.floor(2250 + Math.random() * 2000)
						);
						break;
					}
					else {
						document.cookie = 'autofarm_run=0';
					}
				}
			}
			else {
				document.cookie = 'autofarm=off';
				document.cookie = 'autofarm_run=0';
				alert("Fehler: Uebersichts-Tabellen-Spalten nicht gefunden.");
			}
		}
		else {
			document.cookie = 'autofarm=off';
			document.cookie = 'autofarm_run=0';
			alert("Fehler: Uebersichts-Tabelle nicht gefunden.");
		}
	}
	else if (
		/screen=overview/.test(location.href) &&
		!/screen=overview_/.test(location.href)
	) {
		window.setInterval(
			"location.href='staemme.php?village=" + village_id + "&screen=map'",
			Math.floor(1000 + Math.random() * 1000)
		);
	}
	else if (
		/screen=map/.test(location.href)
	) {
		for (var trial = 0; ; trial++) {
			var tds = document.getElementsByTagName('td');
			var arr = new Array();
			for (var i = 0; i < tds.length; i++){
				var str = tds[i].innerHTML;
				if (str.indexOf('<table') >= 0) continue;
				if (str.indexOf('_left.png') < 0) continue;
				if (trial == 0 && str.indexOf('attack.png') >= 0) continue;
				var search_str = 'onmouseover="Map.map_popup(event, ';
				var j = str.indexOf(search_str);
				if (j < 0) continue;
				j += search_str.length;
				var k = str.indexOf(')"', j);
				if (k < 0) continue;
				var str = str.substr(j, k - j);
				var prms = eval('new Array('+str+')');
				if (prms.length < 15) my_throw("prms.length zu klein");
				var ppoints = prms[3];
				var powner = prms[4];
				var ptgtid = prms[10];
				var psrcid = unsafeWindow.game_data.village.id;
				var pdate = prms[12];
				var pladot = prms[13];
				var pmloot = prms[14];
				if (powner) continue;
				if (pdate) {
					pdate =
						pdate.substr(6, 2) + pdate.substr(3, 2) + pdate.substr(0, 2) +
						pdate.substr(9, 2) + pdate.substr(12, 2)
					;
				}
				else {
					pdate = "0000000000";
				}
				var val = ppoints;
				if (pladot && pladot.indexOf('red.png') >= 0) {
					// Lost completely at last attack.
					continue;
				}
				if (pladot && pladot.indexOf('yellow.png') >= 0) {
					// Lost one or more units at last attack.
					val /= 2;
				}
				if (pmloot && pmloot.indexOf('1.png') >= 0) {
					// Last attack did not farm all.
					val *= 4;
				}
				var url = 'staemme.php?village=' +
					psrcid + '&screen=info_village&id=' + ptgtid;
				arr.push(new Array(pdate, val, url));
			}
			if (arr.length > 0) {
				arr.sort(
					function sortNumber(a, b)
					{
						if (a[0] < b[0]) return -1;
						if (a[0] > b[0]) return 1;
						return 0;
					}
				);
				var n = Math.ceil(arr.length / 3);
				if (n < 1) n = 1;
				while (n < arr.length && arr[n - 1][0] == arr[n][0]) n++;
				arr = arr.slice(0, n - 1);
				var sum = 0;
				for (var i = 0; i < arr.length; i++) sum += arr[i][1];
				var r = Math.random() * sum;
				sum = 0;
				for (var i = 0; i < arr.length; i++) {
					sum += arr[i][1];
					if (i + 1 == arr.length || sum >= r) {
						r = arr[i];
						break;
					}
				}
				window.setInterval(
					'location.href="' + r[2] + '"',
					Math.floor(2500 + Math.random() * 8500)
				);
				break;
			}
			if (trial > 0) {
				document.cookie = 'autofarm=off';
				document.cookie = 'autofarm_run=0';
				alert("Kein geeignetes verlassenes Dorf vorhanden!");
				break;
			}
		}
	}
	else if (
		/screen=info_village/.test(location.href) &&
		/id=/.test(location.href)
	) {
		var id = /id=(\d+)/.exec(location.href);
		if (id && id.length == 2) {
			id = id[1];
			var url = 'staemme.php?village=' + village_id +
				'&screen=place&mode=command&target=' + id;
			window.setInterval(
				'location.href="' + url + '"',
				Math.floor(1000 + Math.random() * 1000)
			);
		}
		else {
			my_throw("failed to parse id on village info page");
		}
	}
	else if (
		/screen=place/.test(location.href) &&
		!/try=/.test(location.href)
	) {
		var as = document.getElementsByTagName('a');
		var spys = -1;
		var lkavs = -1;
		for (var i = 0; i < as.length; i++) {
			var x = /insertUnit\(document\.forms\[0\]\.spy,%20(\d+)\)/.exec(as[i].href);
			var y = /insertUnit\(document\.forms\[0\]\.light,%20(\d+)\)/.exec(as[i].href);
			if (x && x.length == 2) spys = parseInt(x[1]);
			if (y && y.length == 2) lkavs = parseInt(y[1]);
		}
		if (spys >= spysPerAttack && lkavs >= lkavsPerAttack / 2) {
			if (
				/mode=command/.test(location.href) &&
				/target=/.test(location.href)
			) {
				var lkavsToSend = lkavsPerAttack;
				if (lkavs <= (1.5 + 0.25 * Math.random()) * lkavsPerAttack) {
					lkavsToSend = lkavs;
				}
				var url =
					"javascript:" +
					"insertUnit(document.forms[0].spy," + spysPerAttack + ");" +
					"insertUnit(document.forms[0].light," + lkavsToSend + ");" +
					"document.forms.units.attack.click();"
				;
				window.setInterval(
					'location.href="' + url + '"',
					Math.floor(3000 + Math.random() * 2200)
				);
			}
			else {
				window.setInterval(
					"location.href='staemme.php?village=" + village_id + "&screen=map'",
					Math.floor(1200 + Math.random() * 1200)
				);
			}
		}
		else {
			window.setInterval(
				"location.href='staemme.php?village=" + village_id + "&screen=overview_villages&mode=combined'",
				Math.floor(1200 + Math.random() * 1200)
			);
			document.cookie = 'autofarm_run=0';
		}
	}
	else if (
		/screen=place/.test(location.href) &&
		/try=confirm/.test(location.href)
	) {
		var url = "javascript:document.forms[0].submit.click();";
		window.setInterval(
			'location.href="'+url+'"',
			Math.floor(800 + Math.random() * 1000)
		);
	}
	else {
		document.cookie = 'autofarm=off';
		document.cookie = 'autofarm_run=0';
		alert("Fehler: Unerwartete Seite geladen!");
	}
}
// GM_log("off2")
})()
