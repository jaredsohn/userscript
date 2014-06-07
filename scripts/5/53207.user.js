// ==UserScript==
// @name           DS - Arrival Date CH + DE
// @namespace      limone
// @description    Zählt die Ankunftszeit weiter
// @include        http://de*.die-staemme.de/*screen=place&try=confirm*
// @include        http://*.staemme.ch/*screen=place&try=confirm*
// ==/UserScript==

arrivalTimer = new Array();

function timeFormated(now,then) {
	var dd		=  'am ' +
			  ('0'+then.getDate()).substr(-2) + '.' +
			  ('0'+(then.getMonth()+1)).substr(-2) + '.';
	var tmrrw	= new Date(now.getTime() + 86400000)
	if (now.getDate()   == then.getDate() && now.getMonth()   == then.getMonth())	dd = 'heute';
	if (tmrrw.getDate() == then.getDate() && tmrrw.getMonth() == then.getMonth())	dd = 'morgen';
	var output	= dd + ' um ' +
			  ('0'+then.getHours()).substr(-2) + ':' +
			  ('0'+then.getMinutes()).substr(-2) + ':' +
			  ('0'+then.getSeconds()).substr(-2) + 
			   ' Uhr ';
	return output;
}

function callArrivalDate() {
	var field	= document.getElementById('serverTime').innerHTML.split(':');
	if (!field)	  { clearTimeout(arrivalTimer[0]); return false; }
	var sTime	= new Date();
	sTime.setSeconds(parseInt(field[2],10));
	sTime.setMinutes(parseInt(field[1],10));
	sTime.setHours(parseInt(field[0],10));
	var arrival	= new Date(sTime.getTime() + arrivalTimer[1]);
	field		= document.getElementById('date_arrival');
	field.innerHTML = timeFormated(sTime,arrival);

}

function main() {
	var field	= document.getElementById('date_arrival');
			  if (!field)		return false;
	var duration	= field.parentNode.parentNode.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML.split(':');
			  if (!duration)	return false;
	var offset	= parseInt( duration[2], 10) * 1000
			  + parseInt( duration[1], 10) * 60000
			  + parseInt( duration[0], 10) * 3600000;
	arrivalTimer	= Array(window.setInterval(callArrivalDate, 500), offset)
}


window.addEventListener( 'load', main, true);