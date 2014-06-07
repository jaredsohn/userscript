// ==UserScript==
// @name          Auto Farm FTW 1.0
// @description   Vol automatisch farmen by Godly ^^
// @include       http://*.tribalwars.nl/game.php*
// @include       http://*.tribalwars.nl/game.php*
// ==/UserScript==


/*
Author: Godly Ftw <pr0script@hotmail.com> @version 1.0
*******************************
*** Auto Farm FTW version 1.0 ***
*******************************

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
! Dit script is alleen de fantastische mogelijkheden van scripting,             !
! aan te tonen met Greasemonkey. Een feitelijke gebruik zou						!
! waarschijnlijk tegen de regels van "tribalwars.nl" zijn. 						!
!Gelieve dit script voor je zelf te houden.										!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Dit script farmt BB's vol automatisch. 

Op de overzichtspagina, zal een groene of rode link verschijnen met de tekst
"Auto Run Farm" of "Auto Stop Farm." Hierdoor kan de auto naar een farm in en uit schakelen.

-Autofarm Starten  (Instellen)
-Autofarm Stoppen

BELANGRIJKE OPMERKINGEN:

* Terwijl de auto is ingeschakeld op farmen, kan in een ander venster
  alle webpagina's van tribalwars bekijken. Dus wanneer je iets in tribalwars
  wil doen of bekijken, moet u uitschakelen van het auto farmen!

* Auto Farm FTW 1.0 kan alleen maar werken met een premium account.

* Je moet de kaart is ingesteld op 15x15 (werkt alleen met PA), omdat de
  Auto Farm FTW tool, de farm's daar bekijkt en leeg farmt ^^.

Powered by .Serious Play
Member of team Bartowski
Player on Godly Underdogg
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
	var x = prompt("Aantal Scouts Per Aanval:", spysPerAttack);
	if (x) {
		var y = prompt("LC per aanval:", lkavsPerAttack);
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
		'location.href=\'game.php?village=' +
		village_id +
		'&screen=overview_villages&mode=combined\';"' +
		'><FONT color=#6C2DC7>Autofarm Starten</FONT></A>&nbsp;&nbsp;' +
		'<A HREF="javascript:document.cookie=\'autofarm=setup\';' +
		'location.reload()">(Instellen)</A>'
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
		'location.reload()"><FONT color=#0000A0>Autofarm Stoppen</FONT></A>'
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
							"location.href='/game.php?village=" + vllg + "&screen=overview'",

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
				alert("Foutje: overzicht-tabel niet gevonden.");
			}
		}
		else {
			document.cookie = 'autofarm=off';
			document.cookie = 'autofarm_run=0';
			alert("Foutje: overzicht-tabel niet gevonden.");
		}
	}
	else if (
		/screen=overview/.test(location.href) &&
		!/screen=overview_/.test(location.href)
	) {
		window.setInterval(
			"location.href='/game.php?village=" + village_id + "&screen=map'",
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
				var url = '/game.php?village=' +
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
				alert("Geen BB te farmen daaro :(.");
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
			var url = '/game.php?village=' + village_id +
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
					"location.href='/game.php?village=" + village_id + "&screen=map'",
					Math.floor(1200 + Math.random() * 1200)
				);
			}
		}
		else {
			window.setInterval(
				"location.href='/game.php?village=" + village_id + "&screen=overview_villages&mode=combined'",
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
		alert("Foutje: Onverwachte pagina geladen.");
	}
}
// GM_log("off2")
})()
