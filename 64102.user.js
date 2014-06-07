// ==UserScript==
// @name           [TE] Czas zakończenia budowy/produkcji
// @version        0.1.3
// @namespace      -
// @description    Podaje przybliżony czas zakończenia budowy lub produkcji.
// @include        http://*.czaswojny.interia.pl/*a=village*do=mine*
// @include        http://*.czaswojny.interia.pl/*a=village*do=units*
// @include        http://*.czaswojny.interia.pl/*a=village*do=builds*
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

var builtTime;
var endTime;


//Pobieramy czas jaki został do zakończenia budowy/produkcji
function getTime() {
	var i = 0;
	time = document.getElementsByTagName('b')[i].getAttribute('class');
	
	while (time != 'timer-active') {
		time = document.getElementsByTagName('b')[i].getAttribute('class');
		
		if (time == 'timer-active') {
			//Znalezione, pobieramy czas i przeliczamy go na sekundy
			time = document.getElementsByTagName('b')[i].innerHTML;
			timeLength = time.length;
				
			hours = time.slice(0,timeLength - 6);
			hoursLength = hours.length + 1;
			hours = hours * 3600;
			
			minutes = time.slice(hoursLength,timeLength - 3);
			minutesLength = minutes.length + 1;
			minutes = minutes * 60;
			
			seconds = time.slice(hoursLength + minutesLength,timeLength)
			seconds = parseInt(seconds);
			
			builtTime = hours + minutes + seconds;
			
			break; //Znalezione, pobrane - przerywamy
		}
				
		i += 1;
	}
}

//Liczymy o której godzinie zostanie zakończona budowa
function countTime(){
	//Pobieramy aktualny czas i przeliczamy go na sekundy
	var now = new Date();
	var hours = now.getHours() * 3600;
	var minutes = now.getMinutes() * 60;
	var seconds = now.getSeconds();
	
	nowTime = hours + minutes + seconds;

	endTime = nowTime + builtTime; //Dodajemy czasy do siebie
	endHour = endTime / 3600; //Konwertujemy czas na godzine
	endHour = endHour + '';
	
	//Wycinamy godzine
	if (endHour >= 100) {
		endHour = endHour.slice(0,3);
	} else if (endHour >= 10) {
		endHour = endHour.slice(0,2);
	} else {
		endHour = endHour.slice(0,1);
	}
	//Już wiemy która godzina :)
	
	endMinute = (endTime / 60) - (endHour * 60); //Konwertujemy pozostały czas na minuty
	endMinute = endMinute + '';
	
	//Wycinamy minuty
	if (endMinute >= 10) {
		endMinute = endMinute.slice(0,2);
	} else {
		endMinute = endMinute.slice(0,1);
	}
	//Już wiemy która minuta
	
	endSecond = endTime - (endMinute * 60 + endHour * 3600); //Pozostały czas to sekundy
	
	//Upiększamy, dodajemy 0 na początku gdy liczba jest mniejsza od 10
	if (endHour < 10) {
		endHour = '0' + endHour;
	}
	
	if (endMinute < 10) {
		endMinute = '0' + endMinute;
	}
	
	if (endSecond < 10) {
		endSecond = '0' + endSecond;
	}
	
	//Sprawdzamy czy budowa skończy sie dzisiaj, czy jutro
	if (endHour >= 24) {
		endDay = endHour / 24;
		endDay = endDay + ''; 
		endDay = endDay.slice(0,1);
				
		endHour = endHour - endDay * 24;	
	} else {
		endDay = '';
	}
	
	//Jeżeli jest 1 dzień, to nie wyświetlamy, jeżeli więcej, odejmujemy jeden i dopisujemy :)
	if (endDay == 0) {
		endTime = endHour + ':' + endMinute + ':' + endSecond;	
	} else if (endDay == 1 ) {
		endTime = endHour + ':' + endMinute + ':' + endSecond;	
	} else {
		endDay = parseInt(endDay) - 1;
		endDay = endDay + 'D ';	
		endTime = endDay + endHour + ':' + endMinute + ':' + endSecond;	
	}
	
}

//No i wsadzamy to na stronę :)
function insertBox() {
	var i = 0;
	place = document.getElementsByTagName('div')[i].getAttribute('class');
	
	while (place != 'queue-text') {
		place = document.getElementsByTagName('div')[i].getAttribute('class');
		
		if (place == 'queue-text') {
			place = document.getElementsByTagName('div')[i];
			
			timeLabel = document.createElement('div');
				timeLabel.setAttribute('id','timeLabel');
				timeLabel.setAttribute('title','Przybliżony czas zakończenia: ' + endTime);
				timeLabel.setAttribute('style','color: #dff288; font-weight:bold; padding-top: 2px;')
				timeLabel.innerHTML = endTime;
				place.appendChild(timeLabel);
				
			break;
		}
		
		i += 1;
	}
}

//------ Wywoływanie funkcji ------//
getTime();
countTime();
insertBox();