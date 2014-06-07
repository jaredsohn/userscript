// ==UserScript==
// @name           SeoPilot.pl - Zarobki poleconych
// @namespace      http://kubofonista.net
// @description    Plugin wyświetlający zarobki poleconych osób
// @include        http://seopilot.pl/referals.html
// ==/UserScript==

tabela = document.getElementsByClassName('table');
t2 = tabela[0].getElementsByTagName('tr');
nagl = document.createElement('th');
nagl.innerHTML = 'Całkowity dochód (poleconego)';
document.getElementsByClassName('table')[0].getElementsByTagName('tr')[0].appendChild(nagl);
document.getElementsByClassName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[4].setAttribute('width','5%');

ile = t2.length-1;

for (i=1;i<=ile;i++)
{
	dodaj_dochod = document.createElement('td');
	dodaj_dochod.setAttribute('align','center');
	
	if(i == ile) // podsumowanie
	{
		prowizja = document.getElementsByClassName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML.replace(/(<([^>]+)>)/ig,"");
		dodaj_dochod.setAttribute('style','font-weight:bold');
	}
	else
	{
		prowizja = document.getElementsByClassName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML;
	}
	
	dochod = (prowizja*100)/5;
	dochod = Math.round(dochod*100)/100;
	dodaj_dochod.innerHTML = dochod;
	document.getElementsByClassName('table')[0].getElementsByTagName('tr')[i].appendChild(dodaj_dochod);
}
