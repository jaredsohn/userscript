// ==UserScript==
// @name           [TE] Całkowity czas podróży
// @version        0.1
// @namespace      -
// @description    Podaje informacje o której godzinie wojka dotrą na miejsce i powrócą do wioski.
// @include        http://*.czaswojny.interia.pl/*a=selectArmy&x=*&y=*&typeAction=*
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

function countArmies() {
	for (i = 0; i <= 50; i++) {
		army = document.getElementsByClassName('armybox')[i].innerHTML;
		
		//Mógłbym to zrobić bez 'if' ale nie chcę zbytnio obciążać
		//Instrukcja sprawdzi czy znalazł się taki element
		//	Jeżeli tak, to wykonuje polecenia
		//  Jeżeli nie, przerywa całą pętle, gdyż z wiadomości posiadanych przez autora
		//      zakłada, że dalej już nie ma takich elementów :P
		 
		if (army != '') {
			position1 = army.indexOf('<b>');
			position2 = army.indexOf('</b>');
			
			time = army.slice(position1 + 3, position2);
			
			lookfor1 = time.search('godz.');
			lookfor2 = time.search('min.');
			lookfor3 = time.search('sek.');
			
			if (lookfor1 != -1 && lookfor2 != -1 && lookfor3 != -1) {
				h = time.slice(0, time.indexOf('godz.'))
				m = time.slice(time.indexOf('godz.') + 5, time.indexOf('min.'));
				s = time.slice(time.indexOf('min.') + 4, time.length - 6);
			//alert('h:' + h + ' m:' + m + ' s:' + s);
			}
			
			if (lookfor1 == -1 && lookfor2 != -1 && lookfor3 != -1) {
				h = 0;
				m = time.slice(0, time.indexOf('min.'));
				s = time.slice(time.indexOf('min.') + 4, time.length - 6)
			//alert('h:' + h + ' m:' + m + ' s:' + s);
			}
			
			if (lookfor1 == -1 && lookfor2 == -1 && lookfor3 != -1) {
				h = 0;
				m = 0;
				s = time.slice(0, 2);
			//alert('h:' + h + ' m:' + m + ' s:' + s);
			}
			
			time = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s)
			
			slice1 = army.slice(0, position2 + 4);
			slice2 = army.slice(position2 + 4, army.length);
			
			var now = new Date();
			var hours = now.getHours() * 3600;
			var minutes = now.getMinutes() * 60;
			var seconds = now.getSeconds();
			
			nowTime = hours + minutes + seconds;
			
			function countComeTime(){
				comeTime = nowTime + time;
				
				comeHour = comeTime / 3600;
				
				if (comeHour >= 100) {
					comeHour = comeHour + '';
					comeHour = comeHour.slice(0, 3);
				} else if (comeHour >= 10) {
					comeHour = comeHour + '';
					comeHour = comeHour.slice(0, 2);
				} else {
					comeHour = comeHour + '';
					comeHour = comeHour.slice(0, 1);
				}
				
				comeMinute = (comeTime / 60) - (comeHour * 60); //Konwertujemy pozostały czas na minuty
				
				if (comeMinute >= 10) {
					comeMinute = comeMinute + '';
					comeMinute = comeMinute.slice(0, 2);
				} else {
					comeMinute = comeMinute + '';
					comeMinute = comeMinute.slice(0, 1);
				}

				comeSecond = comeTime - (comeMinute * 60 + comeHour * 3600); //Pozostały czas to sekundy

				if (comeHour >= 24) {
					comeDay = comeHour / 24;
					comeDay = comeDay + '';
					
					comeDay = comeDay.slice(0,1);
					
					comeHour = comeHour - comeDay * 24;
				}
				
				if (comeHour < 10) {
					comeHour = '0' + comeHour;
				}
	
				if (comeMinute < 10) {
					comeMinute = '0' + comeMinute;
				}
	
				if (comeSecond < 10) {
					comeSecond = '0' + comeSecond;
				}
				
				comeTime = comeHour + ':' + comeMinute + ':' + comeSecond;
			}
			
			function countEndTime(){
				endTime = nowTime + time*2;
				
				endHour = endTime / 3600;
				
				if (endHour >= 100) {
					endHour = endHour + '';
					endHour = endHour.slice(0, 3);
				} else if (endHour >= 10) {
					endHour = endHour + '';
					endHour = endHour.slice(0, 2);
				} else {
					endHour = endHour + '';
					endHour = endHour.slice(0,1);
				}
				
				endMinute = (endTime / 60) - (endHour * 60); //Konwertujemy pozostały czas na minuty
				
				if (endMinute >= 10) {
					endMinute = endMinute + '';
					endMinute = endMinute.slice(0, 2);
				} else {
					endMinute = endMinute + '';
					endMinute = endMinute.slice(0, 1);
				}
				
				endSecond = endTime - (endMinute * 60 + endHour * 3600); //Pozostały czas to sekundy
				
				if (endHour >= 24) {
					endDay = endHour / 24;
					endDay = endDay + '';
					
					endDay = endDay.slice(0,1);
					
					endHour = endHour - endDay * 24;
				}
				
				if (endHour < 10) {
					endHour = '0' + endHour;
				}
	
				if (endMinute < 10) {
					endMinute = '0' + endMinute;
				}
	
				if (endSecond < 10) {
					endSecond = '0' + endSecond;
				}
				
				endTime = endHour + ':' + endMinute + ':' + endSecond;
			}
			
			//---- Wywoływanie funkcji ----//	
			countComeTime();
			countEndTime();
			
			
			document.getElementsByClassName('armybox')[i].innerHTML = slice1 + '\
			<div style="color:#633434; font-weight: bold; padding: 3px 0"> \
			Przewidywany czas dotarcia: ' + comeTime + '<br/>\
			Przewidywany czas powrotu: ' + endTime + '</div>' + slice2;
			
		} else {
			break;
		}
	}
}

countArmies();