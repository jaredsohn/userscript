// ==UserScript==
// @name           [TE] Weź wszystko ze spichlerza
// @version	   0.1
// @namespace      -
// @description    Dodaje guzik który wybiera wszystkie surowce ze spichlerza
// @include        http://*.czaswojny.interia.pl/*a=village&vid=*&do=garner
// ==/UserScript==

/* Jest to wczesne stadium rozwoju skryptu mającego na celu ułatwienie 
 * gry graczom Time Edge (www.czaswojny.interia.pl)
 * 
 * Skrypt działa w 100% poprawnie w epoce pierwszej.
 * 
 * Powinien działać na wszystkich serwerach.
 * 
 * Ze względu na brak dostępu do wyższych epok nie jestem tego w stanie 
 * sprawdzić i w razie czego poprawić błędów.
 * 
 * Jeżeli zauważyłeś jakiś błąd w skrypcie, bądź nie działa on poprawnie
 * napisz na oficjalnym forum gry, w temacie założonym przeze mnie.
 */

var i = 0;

function stickIt() {
	
	for (i=0;i<10;i++) {
		row = document.getElementsByTagName('tr')[i].getAttribute('class');

		if (row == 'statRowOdd') {
			row = document.getElementsByTagName('tr')[i].innerHTML;
			position1 = row.lastIndexOf('<b class="right-header">');
			position2 = row.lastIndexOf('</b>');
			
			amount = row.slice(position1+24,position2);
			
			document.getElementById('ftvs'+(i+1)).value = amount;
		}
	
		if (row == 'statRowEven') {
			row = document.getElementsByTagName('tr')[i].innerHTML;
			position1 = row.lastIndexOf('<b class="right-header">');
			position2 = row.lastIndexOf('</b>');
			
			amount = row.slice(position1+24,position2);
			
			document.getElementById('ftvs'+(i+1)).value = amount;
		}
	}	
}

function insertBox() {
	var lookfor = -1;
	
	while (lookfor == -1) {
		place = document.getElementsByTagName('form')[i].innerHTML;
		lookfor = place.search('Wioska')
		
		if (lookfor != -1) {
			place = document.getElementsByTagName('form')[i];
			
			takeButton = document.createElement('input');
				takeButton.type = 'button';
				takeButton.value = 'Weź wszystko';
				takeButton.addEventListener('click',stickIt,false);
				takeButton.setAttribute('id','takeButton');
				takeButton.setAttribute('class','button');
				place.appendChild(takeButton);
		}
		
		i += 1;		
	}
}

insertBox();