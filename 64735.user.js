// ------------------------------------------------------------------------------------------------------------------------
// Plemiona.pl 5.X Skrypt użytkowy
//
// Nazwa:      Wyświetlanie czasu dotarcia jednostek
// Wersja:     1.1
// Autor:      johans (Forum Plemion)
// Dostosował: Lukasz032 (Plemiona Ś7)
//
// Tagi specjakne:
// Licencja:   Creative Commons Uznanie autorstwa - Brak komercyjnego zastosowania - Na tych samych warunkach 2.0 Polska
// Informacje: http://creativecommons.org/licenses/by-nc-sa/2.0/pl
// Support:    lvwnbrz@lykamspam.pl
//
// ------------------------------------------------------------------------------------------------------------------------
// ==UserScript==
// @name           Wyświetlanie czasu dotarcia jednostek
// @namespace      http://code.google.com/p/plemiona-skrypty/
// @description    Wyświetlanie czasu dotarcia jednostek
// @version        1.1
// @license        Creative Commons 2.0 BY-NC-SA (http://creativecommons.org/licenses/by-nc-sa/2.0/pl)
// @author         johans (Forum Plemion)
// @contributor    Lukasz032 (Plemiona Ś7)
// @include        http://pl*.plemiona.pl/*screen=place*
// ==/UserScript==
// ------------------------------------------------------------------------------------------------------------------------

function getTime(element) {

	if(element.firstChild.nodeValue == null) return -1;
	var part = element.firstChild.nodeValue.split(":");

	for(var j=1; j<3; j++) {
		if(part[j].charAt(0) == "0")
			part[j] = part[j].substring(1, part[j].length);
	}

	var hours = parseInt(part[0]);
	var minutes = parseInt(part[1]);
	var seconds = parseInt(part[2]);
	var time = hours*60*60+minutes*60+seconds;
	return time;
}

function formatTime(element, time, clamp) {
	var hours = Math.floor(time/3600);
	if(clamp) hours = hours%24;
	var minutes = Math.floor(time/60) % 60;
	var seconds = time % 60;

	var timeString = hours + ":";
	if(minutes < 10)
		timeString += "0";
	timeString += minutes + ":";
	if(seconds < 10)
		timeString += "0";
	timeString += seconds;

	var oldTimeString = element.firstChild.nodeValue;
element.firstChild.nodeValue = oldTimeString.substring(0, oldTimeString.length - timeString.length) + timeString;

}

function tickArrivalTime() {

	var arrivalTimeSpan=document.getElementById("date_arrival");
	arrivalTimeSpan.parentNode.parentNode.childNodes[6].childNodes[1].id='travel_time';
	var serverTime = getTime(document.getElementById("serverTime"));
	var travelTime = getTime(document.getElementById("travel_time"));
	var arrivalTime = serverTime+travelTime;
	
	formatTime(arrivalTimeSpan,arrivalTime,true);
}

window.setInterval(tickArrivalTime, 1000);