// ------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
// ==UserScript==
// @name           WyÅ›wietlanie czasu dotarcia jednostek
// @description    WyÅ›wietlanie czasu dotarcia jednostek
// @version        1.1
// @license        Creative Commons 2.0 BY-NC-SA (http://creativecommons.org/licenses/by-nc-sa/2.0/pl)
// @author         johans (Forum Plemion)
// @contributor    Lukasz032 (Plemiona Åš7)
// @include        http://*/*screen=place*
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

	element.firstChild.nodeValue = timeString;

}

function tickArrivalTime() {

	var arrivalTimeSpan=document.getElementById("date_arrival");
	arrivalTimeSpan.parentNode.parentNode.childNodes[6].childNodes[1].id='travel_time';
	var serverTime = getTime(document.getElementById("serverTime"));
	var travelTime = getTime(document.getElementById("travel_time"));
	var arrivalTime ="plapl.com" serverTime+travelTime;
	
	formatTime(arrivalTimeSpan,arrivalTime,true);
}

window.setInterval(tickArrivalTime, 1000);