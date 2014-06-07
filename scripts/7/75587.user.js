// ==UserScript==
// @name           DSSaveLastClick
// @namespace      DS
// @author         Bananaz
// @description    Speichert den Zeitpunkt des letzten Klicks und die Anzahl der Angriffe zu diesem Zeitpunkt
// @include        http://de*.die-staemme.de/game.php*
// ==/UserScript==

   /// ----------------------------------------------------------------------------- ///
  ///      Modifikationen und Weiterverbreitung dieses Scripts benoetigen unbedingt ///
 ///                             die Zustimmung des Autors!                        ///
/// ----------------------------------------------------------------------------- ///

function save() {
	if (GM_getValue('LastClickTime') != undefined) {var arr = GM_getValue('LastClickTime').split(';')}
	else {var arr = new Array()}
	var time = document.getElementById('serverTime').innerHTML;
	var tables = document.getElementsByClassName('box');
	var attExec = /\((\d+)\)$/;
	for (a = 0; a < tables.length; a++) {
		if (tables[a].getElementsByTagName('img')[0].src.match('unit/att.png') && attExec.test(tables[a].getElementsByTagName('a')[0].innerHTML)) {
			var attZahl = parseInt(attExec.exec(tables[a].getElementsByTagName('a')[0].innerHTML)[1]);
		}
	}
	if (attZahl == undefined) {
		for (a = 0; a < tables.length; a++) {
			if (attExec.test(tables[a].getElementsByTagName('td')[0].innerHTML)) {
				var attZahl = parseInt(attExec.exec(tables[a].getElementsByTagName('td')[0].innerHTML)[1]);
			}
		}	
	}
	if (attZahl == undefined) {
		var attZahl = 0;
	}
	var str = time + ',' + String(attZahl);
	arr[arr.length] = str;
	while (arr.length > 10) {arr.shift()}
	GM_setValue('LastClickTime', arr.join(';'));
}

function show() {
	var arr = GM_getValue('LastClickTime').split(';');
	var text = '';
	text += 'hh:mm:ss   Atts\n';
	for (a = arr.length - 1; a > -1; a--) {
		text += ' ' + arr[a].split(',')[0] + '       ' + arr[a].split(',')[1] + 'x\n';
	}
	alert(text);

}

function main() {
	document.addEventListener('click', save, false);
	GM_registerMenuCommand('ShowLastClickTime', show);
}

main();