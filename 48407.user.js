// ==UserScript==
// @name                Nukezone Unit Calcs
// @namespace           Nukezone
// @description         Adds some useful (and automatic!) calculations
// @include             http://www.nukezone.nu/build.asp*
// ==/UserScript==

var tables = document.getElementsByTagName('table');

for (var i=0; i < tables.length; i++)
{
	if (tables[i].getAttribute('class') == 'content')
	{

		var housenw = 0;
		if (document.body.innerHTML.search('empty war factories') != -1)
		{
			housenw = 8.9;
		}
		else if (document.body.innerHTML.search('empty barracks') != -1)
		{
			housenw = 2.45;
		}
		else if (document.body.innerHTML.search('empty airfields') != -1)
		{
			housenw = 7.1;
		}
		else if (document.body.innerHTML.search('empty shipyards') != -1)
		{
			housenw = 16.6;
		}
		if (housenw != 0)
		{
		var trs = tables[i].getElementsByTagName('tr');
		var cnw = document.createElement('td');
		cnw.setAttribute('valign', 'top');
		cnw.setAttribute('align', 'center');
		cnw.setAttribute('width', '8%');
		cnw.innerHTML = 'NW';
		var catnw = document.createElement('td');
		catnw.setAttribute('valign', 'top');
		catnw.setAttribute('align', 'center');
		catnw.setAttribute('width', '8%');
		catnw.innerHTML = 'A/TNW';
		var clnw = document.createElement('td');
		clnw.setAttribute('valign', 'top');
		clnw.setAttribute('align', 'center');
		clnw.setAttribute('width', '8%');
		clnw.innerHTML = 'L/NW';
		var cal = document.createElement('td');
		cal.setAttribute('valign', 'top');
		cal.setAttribute('align', 'center');
		cal.setAttribute('width', '8%');
		cal.innerHTML = 'A/L';
		
		var tds = trs[0].getElementsByTagName('td');
		tds[0].setAttribute('width', '15%');
		tds[1].setAttribute('width', '8%');
		tds[2].setAttribute('width', '8%');
		tds[3].setAttribute('width', '8%');
		tds[4].setAttribute('width', '13%');
		tds[5].setAttribute('width', '8%');
		tds[6].setAttribute('width', '8%');
		trs[0].insertBefore(cal, tds[5]);
		trs[0].insertBefore(clnw, tds[3]);	
		trs[0].insertBefore(catnw, tds[3]);	
		trs[0].insertBefore(cnw, tds[2]);	
		
		var tempi = 1;
		while (trs[tempi].getElementsByTagName('td').length != 1)
		{

			var tr = trs[tempi];
			tds = trs[tempi].getElementsByTagName('td');

			var tnw = document.createElement('td');
			tnw.setAttribute('valign', 'middle');
			tnw.setAttribute('align', 'center');

			var tatnw = document.createElement('td');
			tatnw.setAttribute('valign', 'middle');
			tatnw.setAttribute('align', 'center');

			var tlnw = document.createElement('td');
			tlnw.setAttribute('valign', 'middle');
			tlnw.setAttribute('align', 'center');

			var tal = document.createElement('td');
			tal.setAttribute('valign', 'middle');
			tal.setAttribute('align', 'center');

			
			var price = Number(tds[1].innerHTML.substr(1));
			var attack = Number(tds[2].innerHTML.substr(0, tds[2].innerHTML.indexOf('/')));
			var defence = Number(tds[2].innerHTML.substr(tds[2].innerHTML.indexOf('/') + 1));
			var current = Number(tds[4].innerHTML.substr(0, tds[4].innerHTML.indexOf(' ')));
			var percentage = 0.11;
			if (tds[3].innerHTML == '<span title="Buildings">B</span>')
			{
				percentage = 0.14;
			}
			if (tds[0].innerHTML == 'Spy' || tds[0].innerHTML == 'Sniper' || tds[0].innerHTML == 'Aurora Spy Plane')
			{
				percentage = 0.06;
			}
			var networth = Math.round((price * percentage) * 1000) / 1000;
			var truenetworth = Math.round((networth + housenw) * 1000) / 1000;
			var atnw = Math.round((attack / truenetworth) * 1000) / 1000;
			var lnw = Math.round((defence / networth) * 1000) / 1000;
			var currenta = Math.round((current * attack) * 1000) / 1000;
			var currentd = Math.round((current * defence) * 1000) / 1000;
			tnw.innerHTML = networth;
			tatnw.innerHTML = atnw;
			tlnw.innerHTML = lnw;
			tal.innerHTML = currenta + '/' + currentd;
			
			tr.insertBefore(tal, tds[5]);
			tr.insertBefore(tlnw, tds[3]);
			tr.insertBefore(tatnw, tds[3]);	
			tr.insertBefore(tnw, tds[2]);
			tempi++;
		}
		trs[tempi].getElementsByTagName('td')[0].setAttribute('colspan', '11');
		trs[tempi + 1].getElementsByTagName('td')[0].setAttribute('colspan', '11');
		}
	}
}