// ==UserScript==
// @name            Lets fight erweiterung Direkter angrifsbutton mit 36 stunden wieder angrisarechner by basti1012 pennergame 4.0
// @namespace       by basti1012 http://pennerhack.foren-city.de
// @description      Zeigt hinter den letzen 15 kampfen ein direk Button um wider anzugreifen 
// @include         *pennergame.de/fight*
// ==/UserScript==




var table = document.getElementsByTagName('table')[1];
var tr = table.getElementsByTagName('tr')[0];
var th = document.createElement('th');
tr.setAttribute('style', 'background-color:#232323 ');
th.innerHTML = '<table class="list" border="0" width="170"> &nbsp;&nbsp; 36 Stunden   &nbsp;angriff</table>';

tr.insertBefore(th,tr.getElementsByTagName('th')[3]);
var t = document.getElementsByTagName('table')[1];
var r = t.getElementsByTagName('tr');
for (a = 1; a < r.length - 1; a++){



var table = document.getElementsByTagName("table")[1];
var info = table.getElementsByTagName("tr")[a];
var id = info.innerHTML.split('/">')[2].split('</a>')[0];








	var data = r[a].getElementsByTagName('td')[1];
	var dzien = data.innerHTML.split('.')[0];
	var miesiac = data.innerHTML.split('.')[1];
	var godzina = data.innerHTML.split('.')[2].split(':')[0];
	var minuty = data.innerHTML.split('.')[2].split(':')[1];
	
	dzien = dzien * 1;
	miesiac = miesiac * 1;
	godzina = godzina * 1;
	minuty = minuty * 1;
	godzina += 36;

	while (godzina >= 24){
		godzina = godzina - 24;
		dzien++;
		if ((miesiac == 1) && (dzien == 32)) {miesiac = 2; dzien = 1; }
		if ((miesiac == 2) && (dzien == 29)) {miesiac = 3; dzien = 1; }
		if ((miesiac == 3) && (dzien == 32)) {miesiac = 4; dzien = 1; }
		if ((miesiac == 4) && (dzien == 31)) {miesiac = 5; dzien = 1; }
		if ((miesiac == 5) && (dzien == 32)) {miesiac = 6; dzien = 1; }
		if ((miesiac == 6) && (dzien == 31)) {miesiac = 7; dzien = 1; }
		if ((miesiac == 7) && (dzien == 32)) {miesiac = 8; dzien = 1; }
		if ((miesiac == 8) && (dzien == 32)) {miesiac = 9; dzien = 1; }
		if ((miesiac == 9) && (dzien == 31)) {miesiac = 10; dzien = 1; }
		if ((miesiac == 10) && (dzien == 32)) {miesiac = 11; dzien = 1; }
		if ((miesiac == 11) && (dzien == 31)) {miesiac = 12; dzien = 1; }
		if ((miesiac == 12) && (dzien == 32)) {miesiac = 1; dzien = 1; }		
	}
	if (dzien < 10) {dzien = '0' + dzien;}
	if (miesiac < 10) {miesiac = '0' + miesiac;}
	if (godzina < 10) {godzina = '0' + godzina;}
	if (minuty	 < 10) {minuty = '0' + minuty;}
	var nowa_data = '<font color="">&nbsp;' + dzien + '.' + miesiac + ' ' + godzina + ':' + minuty + '</font>&nbsp;&nbsp;<a href="/fight/?to='+id+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';

	//r[a].getElementsByTagName('td')[4].innerHTML += nowa_data;
	

var td = document.createElement('td');
var tr = table.getElementsByTagName('tr');
td.innerHTML = '<table class="list" border="0" width="170">'+nowa_data+'</table>';
tr[a].insertBefore(td,tr[a].getElementsByTagName('td')[5]);


var tra = table.getElementsByTagName('tr')[a];
var tdd = tra.getElementsByTagName('td')[1];
tdd.innerHTML += '<table class="list" border="0" width="120"></table>';





}















//by basti1012





