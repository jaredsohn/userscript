// ==UserScript==
// @name           DS - Arrival Date
// @description    Zaehlt die Ankunftszeit weiter
// @include        http://de*.die-staemme.de/*try=confirm*screen=place*
// @include        http://de*.die-staemme.de/*screen=place*try=confirm*
// ==/UserScript==

nightends = 8;
var Timer;
offset = 0;
bar = 2;

function main(){
	var patt = /([a-z][a-z])(s?)(\d+)\./.exec(document.location.host);
	var land = patt[1];
	var sds = (patt[2]=='s'?true:false);
	var welt = parseInt(patt[3],10);
	var nightEndDe = new Array(0,0,0,0,0,7,7,7,0,8,8,8,8,8,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,8,0,8,8,8,8,8,7,8,8,8,8,8,8,8,7,8,7,8,7,8,8,8,8); // Nachtbonus bis w56
	if((land=='de')&&(!sds)&&(welt<=nightEndDe.length)) nightends = nightEndDe[welt-1];
	var field = document.getElementById('date_arrival'); if(!field) return;
	if(field.parentNode.parentNode.getElementsByTagName('tr')[2].innerHTML.match('Spieler')) bar=3; //kein Barbarendorf
	var duration = field.parentNode.parentNode.getElementsByTagName('tr')[bar].getElementsByTagName('td')[1].innerHTML.split(':');
	if(!duration) return;
	offset = parseInt( duration[2], 10) * 1000
		+ parseInt( duration[1], 10) * 60000
		+ parseInt( duration[0], 10) * 3600000;
	Timer = window.setInterval(callArrivalDate, 500);
}

function callArrivalDate(){
	var field	= document.getElementById('serverTime').innerHTML.split(':');
	if(!field){clearTimeout(Timer); return;}
	var sTime	= new Date();
	sTime.setSeconds(parseInt(field[2],10));
	sTime.setMinutes(parseInt(field[1],10));
	sTime.setHours(parseInt(field[0],10));
	var arrival	= new Date(sTime.getTime() + offset);
	field		= document.getElementById('date_arrival');
	field.innerHTML = timeFormated(sTime,arrival);
}

function timeFormated(now,then){
	var dd,tmrrw	= new Date(now.getTime() + 86400000);
	if (now.getDate()   == then.getDate() && now.getMonth()   == then.getMonth())	dd = 'heute';
	else if (tmrrw.getDate() == then.getDate() && tmrrw.getMonth() == then.getMonth())	dd = 'morgen';
	else	dd	=  'am '
		+ ('0'+then.getDate()).substr(-2) + '.'
		+ ('0'+(then.getMonth()+1)).substr(-2) + '.';
	var output = dd + ' um '
		+ ('0'+then.getHours()).substr(-2) + ':'
		+ ('0'+then.getMinutes()).substr(-2) + ':'
		+ ('0'+then.getSeconds()).substr(-2) +' Uhr '
		+ (((bar!=2)&&then.getHours()<nightends) ? '<br><span class="warn">Nachtbonus aktiv!</span>':'');
	return output;
}

main();