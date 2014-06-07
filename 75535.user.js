// ==UserScript==
// @name           NBWarnungPlayerInfo
// @namespace      DS
// @author         Bananaz
// @description    Markiert auf einer Spieleruebersicht die Doerfer, in denen ein Angriff aus dem aktuellen eigenen Dorf im Nachtbonus ankommen wuerde.
// @include        http://de*.die-staemme.de/game.php?*screen=info_player*
// ==/UserScript==

   /// ----------------------------------------------------------------------------- ///
  ///      Modifikationen und Weiterverbreitung dieses Scripts benoetigen unbedingt ///
 ///                             die Zustimmung des Autors!                        ///
/// ----------------------------------------------------------------------------- ///


var farbe = 'FFB7A3';
var geschwindigkeit = 30;
var NBBeginn = 0;		//Anfang des Nachtbonus (Stunde)
var NBEnde = 8;			//Ende des Nachtbonus (Stunde)

var bs = document.getElementsByTagName('b');
var koordExec = /\((\d+)\|(\d+)\) K\d+/;
for (a = 0; a < bs.length; a++) {
	if (koordExec.test(bs[a].innerHTML)) {
		var own_x = parseInt(koordExec.exec(bs[a].innerHTML)[1]);
		var own_y = parseInt(koordExec.exec(bs[a].innerHTML)[2]);
		break;
	}
}
var zeit = document.getElementById('serverTime').innerHTML.split(':');
var datum = document.getElementById('serverDate').innerHTML.split('/');
for (a = 0; a < 2; a++) {if (datum[a].charAt(0) == '0') {datum[a] = datum[a].charAt(1)}}


function controlNB(koord) {
	var x = koord.split('|')[0];
	var y = koord.split('|')[1];
	var diff_x = parseInt(x) - own_x;
	var diff_y = parseInt(y) - own_y;
	var distance = Math.sqrt(Math.pow(diff_x, '2') + Math.pow(diff_y, '2'));
	var run = distance * geschwindigkeit;
	var ank = new Date(parseInt(datum[2]), (parseInt(datum[1])-1), parseInt(datum[0]), parseInt(zeit[0]), parseInt(zeit[1]), parseInt(zeit[2]));
	ank.setMinutes(ank.getMinutes() + run);
	if (ank.getHours() >= NBBegin  && ank.getHours() < NBEnde) {return true}
	else {return false}
}

function main() {
	var tables = document.getElementsByTagName('table');
	for (a = 0; a < tables.length; a++) {
		if (tables[a].className.match('vis') && tables[a].getElementsByTagName('th')[2] != undefined && tables[a].getElementsByTagName('th')[2].innerHTML.match('Punkte') && tables[a].getElementsByTagName('th')[1].innerHTML.match('Koordinaten')) {
			var table = tables[a];
			break;
		}
	}
	if (table != undefined) {
		var tr = table.getElementsByTagName('tr');
		for (a = 1; a < tr.length; a++) {
			if (controlNB(tr[a].getElementsByTagName('td')[1].innerHTML)) {
				tr[a].getElementsByTagName('td')[0].style.backgroundColor = '#' + farbe;
			}
			//else {tr[a].getElementsByTagName('td')[0].style.backgroundColor = 'blue'}
		}
	}
}

main();