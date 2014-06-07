// ==UserScript==
// @name           Odliczanie do drugiego ataku
// @namespace      Skrypt do odliczania czasu jaki musi upłynąć przed następnym atakiem na tego samego gracza.
// @description    by Yeramihi
// @include        *menelgame.pl/fight/fightlog/*
// @include        *menelgame.pl/fight/overview/
// ==/UserScript==

/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/



var strefa_czasowa = 0;

var t = document.getElementsByTagName('table')[1];
var r = t.getElementsByTagName('tr');

for (a = 1; a < r.length - 1; a++)
{
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
	
	while (godzina >= 24)
	{
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
	
/*
	var nowa_data = 
		'<br><strong><font color="' + sprawdz(dzien, miesiac, godzina, minuty) + 
		'">' + dzien + '.' + miesiac + '&nbsp;' + godzina + ':' + minuty + '</font></strong>';
*/

	var nowa_data = document.createElement('a');
	
	if (sprawdz(dzien, miesiac, godzina, minuty))
	{
		nowa_data.href = 'http://www.menelgame.pl/fight/?to=' + r[a].getElementsByTagName('td')[2].getElementsByTagName('a')[0].innerHTML;
		nowa_data.style.color = '#00FF00';
		nowa_data.innerHTML = dzien + '.' + miesiac + '&nbsp;' + godzina + ':' + minuty;
	} else
	{
		nowa_data.href = 'http://www.menelgame.pl/fight/overview/';
		nowa_data.style.color = '#FF0000';
		nowa_data.innerHTML = dzien + '.' + miesiac + '&nbsp;' + godzina + ':' + minuty;
	}
	
	r[a].getElementsByTagName('td')[1].innerHTML += '<BR>';
	r[a].getElementsByTagName('td')[1].appendChild(nowa_data);
}

function sprawdz(dz, mi, g, m)
{
	var teraz = new Date();
	var gracz = new Date();
	
	gracz.setDate(dz);
	gracz.setHours(g);
	gracz.setMinutes(m);
	gracz.setMonth(mi-1);

	if (teraz.getTime() >= gracz.getTime())
		var wynik = true;
	else
		var wynik = false;
	
	return wynik;
}
