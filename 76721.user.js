// JavaScript Document
// ==UserScript==
// @name          Spieler in Unterstützungsübersicht
// @namespace     Domi
// @description   Version 2.0 beta: Mit dem Skript werden die unterstützten Spieler in der Unterstützungsübersicht angezeigt.
// @include       http://de*.die-staemme.de/game.php?*type=away_detail*
// @include       http://de*.die-staemme.de/game.php?*info_village*
// @include       http://de*.die-staemme.de/game.php?*screen=settings&mode=settings*
// ==/UserScript==

var server = document.location.host.split('.')[0];
var unt;

function spieler_einblenden() {
    var tab = document.getElementById('units_table');
    var count = 0;
    var max = tab.rows.length - 1;
    for(var i = 0; i < max; i++) {
        if(tab.getElementsByTagName('input')[i]) {
            count++
        }
        else {}
    }
    for(var i = 0; i < count; i++) {
        var linkname = tab.getElementsByTagName('input')[i].nextSibling.innerHTML;
var linkalt = tab.getElementsByTagName('input')[i].nextSibling.href;
var linkneu = linkalt + '#';
tab.getElementsByTagName('input')[i].nextSibling.href = linkneu;
        var koord = linkname.split('(')[1].split(')')[0];
        var x = koord.split('|')[0];
        var y = koord.split('|')[1];
        var wert = GM_getValue(server + '_' + x + y, 'Infos unbekannt,,,,').split(',');
var settings = GM_getValue(server + '_' + 'settings', 'true,false,true,false').split(',');
        var neu;
if(settings[0] == 'true'){
neu = wert[0];
}
if(settings[1] == 'true'){
neu = neu + ' - ' + wert[1];
}
if(settings[2] == 'true'){
neu = neu + ' - ' + koord;
}
if(settings[3] == 'true'){
neu = neu + ' - ' + wert[3];
}
        tab.getElementsByTagName('input')[i].nextSibling.innerHTML = neu;
    }
}

function dorf_einlesen() {
    var koord = document.getElementsByClassName('vis')[0].getElementsByTagName('tbody')[0].getElementsByTagName('td')[1].innerHTML;
    var spieler = document.getElementsByClassName('vis')[0].getElementsByTagName('tbody')[0].getElementsByTagName('a')[0].innerHTML;
    var x = koord.split('|')[0];
    var y = koord.split('|')[1];
	var stamm = document.getElementsByClassName('vis')[0].getElementsByTagName('tbody')[0].getElementsByTagName('a')[1].innerHTML;
	if(stamm.match('Karte zentrieren')){
	stamm = 'kein Stamm';
	}
var dorf = document.getElementsByClassName('vis')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML;
var wert = spieler + ',' + dorf + ',' + koord + ',' + stamm;
GM_setValue(server + '_' + x + y, wert);
}

function doerfer_ausblenden() {
    var tab = document.getElementById('units_table');
    var max = tab.rows.length;
    for(var i = 1; i < max; ) {
        var zeile = tab.getElementsByTagName('tr')[i]; //auch mit hypix laufzeiten 
        if(zeile.getElementsByTagName('td')[1].innerHTML == 'eigene' | zeile.getElementsByTagName('td')[2].innerHTML == 'eigene') {
            zeile.parentNode.removeChild(zeile);
            max = max - 1;
        }
        else {
            i++;
        }
    }
}

function einstellungen() {
	var spieler = confirm('Soll der Spielername angezeigt werden?');
	var dorf = confirm('Soll der Dorfname angezeigt werden?');
	var koordinaten = confirm('Sollen die Koordinaten angezeigt werden?');
	var stamm = confirm('Soll der Stamm des unterstützen Spielers angezeigt werden?');
	var settings = spieler + ',' + dorf + ',' + koordinaten + ',' + stamm;
	GM_setValue(server + '_' + 'settings', settings)
} 

if(location.href.match('type=away_detail')) {
    var a = document.getElementById('units_table');
    if (a) {
        var aa = document.createElement('a');
        aa.innerHTML = 'Unterstützungsdörfer ausblenden';
        aa.setAttribute('href', '#');
        aa.addEventListener('click', function() { doerfer_ausblenden() }, false);
        a.parentNode.insertBefore(aa, a);
    }
    spieler_einblenden();
}

if(location.href.match('info_village') ) {
var test = location.href;
	if(test.match('#')){
		dorf_einlesen();
		var tbody = document.getElementsByClassName('vis')[0].getElementsByTagName('tbody')[0];
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.colSpan = 2;
		tbody.appendChild(tr);
		tr.appendChild(td);
		td.innerHTML = 'Dorf wurde als unterstützt markiert!';
	}
}

if(location.href.match('screen=settings&mode=settings')) {
	var td1 = document.getElementsByClassName('vis settings')[0].parentNode.parentNode;
	var table = document.createElement('table');
	td1.appendChild(table);
	table.setAttribute("class","vis");
	var tr1 = table.insertRow(table.rows.length);
	var tr2 = table.insertRow(table.rows.length);
	table.appendChild(tr1);
	table.appendChild(tr2);
	var th = document.createElement('th');
	tr1.appendChild(th);
	th.innerHTML = 'Spieler in Unterstützungsübersicht 2.0 beta';
	var td2 = document.createElement('td');
	tr2.appendChild(td2);
	var a = document.createElement('a');
	a.innerHTML = 'Einstellungen';
	a.setAttribute('href', '#');
	a.addEventListener('click', function() {einstellungen()}, false);
	td2.appendChild(a);
}
