// ==UserScript==
// @name           36 Stundenrechenr Lets Fight + Direkt-Angriffsbutton
// @namespace      Pennerhack ( visit: http://pennerhack.de.tc/ ),
// @author         Boggler und basti1012
// @description    Zeigt die Zeit an wenn die 36Stundensperre vorbei ist und faerbt es entsprechend
// @include        http://*serserionline.com/fight/*
// @include        http://*clodogame.fr/fight/*
// @include        http://*mendigogame.es/fight/*
// @include        http://*pennergame.de/fight/*
// @include        http://*dossergame.co.uk/fight/*
// @include        http://*menelgame.pl/fight/*
// @include        http://*bumrise.com/fight/*
// @include        http://*pennergame.de/fight/*
// @exclude		   */fightlog/*
// ==/UserScript==

var table = document.getElementsByTagName('table')[1];
var tr = table.getElementsByTagName('tr')[0];
var th = document.createElement('th');
tr.setAttribute('style', 'background-color:#232323 ');
tr.innerHTML += '<table class="list" border="0"><b>&nbsp;&nbsp;  36 Stunden   &nbsp;Angriff</b></table>';

tr.insertBefore(th,tr.getElementsByTagName('th')[3]);
var t = document.getElementsByTagName('table')[1];
var r = t.getElementsByTagName('tr');
for (a = 1; a < r.length; a++){

var table = document.getElementsByTagName("table")[1];
var info = table.getElementsByTagName("tr")[a];
var id = info.innerHTML.split('/">')[2].split('</a>')[0];

	var data = r[a].getElementsByTagName('td')[1];
	var tag = data.innerHTML.split('.')[0];
	var monat = data.innerHTML.split('.')[1];
	var stunde = data.innerHTML.split('.')[2].split(':')[0];
	var minute = data.innerHTML.split('.')[2].split(':')[1];
	
	tag = tag * 1;
	monat = monat * 1;
	stunde = stunde * 1;
	minute = minute * 1;
	stunde += 36;

	while (stunde >= 24){
		stunde = stunde - 24;
		tag++;
		if ((monat == 1) && (tag == 32)) {monat = 2; tag = 1; }
		if ((monat == 2) && (tag == 29)) {monat = 3; tag = 1; }
		if ((monat == 3) && (tag == 32)) {monat = 4; tag = 1; }
		if ((monat == 4) && (tag == 31)) {monat = 5; tag = 1; }
		if ((monat == 5) && (tag == 32)) {monat = 6; tag = 1; }
		if ((monat == 6) && (tag == 31)) {monat = 7; tag = 1; }
		if ((monat == 7) && (tag == 32)) {monat = 8; tag = 1; }
		if ((monat == 8) && (tag == 32)) {monat = 9; tag = 1; }
		if ((monat == 9) && (tag == 31)) {monat = 10; tag = 1; }
		if ((monat == 10) && (tag == 32)) {monat = 11; tag = 1; }
		if ((monat == 11) && (tag == 31)) {monat = 12; tag = 1; }
		if ((monat == 12) && (tag == 32)) {monat = 1; tag = 1; }		
	}
	if (tag < 10) {tag = '0' + tag;}
	if (monat < 10) {monat = '0' + monat;}
	if (stunde < 10) {stunde = '0' + stunde;}
	if (minute	 < 10) {minute = '0' + minute;}

var jetzt = new Date();
var Stunde = jetzt.getHours();
var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);
var Minuten = jetzt.getMinutes();
var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);
var Sek = jetzt.getSeconds();
var SekA = ((Sek < 10) ? "0" + Sek : Sek);
var Jahr = jetzt.getFullYear();
var Tag = jetzt.getDate();
var TagA = ((Tag < 10) ? "0" + Tag : Tag);
var Jahresmonat = jetzt.getMonth();
var Monat = (Number (Jahresmonat) + Number (1))
var MonatA = ((Monat < 10) ? "0" + Monat : Monat);
	
ergebnisheute =MonatA+TagA+StundeA+MinutenA;
ergebniss =monat+tag+stunde+minute;
endergeb = ergebnisheute-ergebniss;

	if(endergeb>=0){
		var nowa_data = '<font color="green">&nbsp;&nbsp;&nbsp;' + tag + '.' + monat + ' ' + stunde + ':' + minute + '</font>&nbsp;&nbsp;<a href="/fight/?to='+id+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
	}else{
		var nowa_data = '<font color="red">&nbsp;&nbsp;&nbsp;' + tag + '.' + monat + ' ' + stunde + ':' + minute + '</font>';
	}
	
var td = document.createElement('td');
var tr = table.getElementsByTagName('tr');
td.innerHTML = '<table class="list" border="0" width="170">'+nowa_data+'</table>';
tr[a].insertBefore(td,tr[a].getElementsByTagName('td')[5]);

var tra = table.getElementsByTagName('tr')[a];
var tdd = tra.getElementsByTagName('td')[1];
tdd.innerHTML += '<table class="list" border="0" width="120"></table>';

}