// ==UserScript==
// @name           Kontrola Ataku
// @namespace      Sprawdzanie czy dany przeciwnik jest w naszym zasięgu do atakowania
// @include        *menelgame.pl/profil/id:*
// ==/UserScript==

var TEST = false;



var skrypt_nazwa = 'kontrola_ataku';
var skrypt_msg = 'kontrola_ataku_msg';
var skrypt_wersja = '0.1.2';


GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://yeramihi.com/skrypty/version.xml', onload: function (source)
	{
		if (source.status == 200) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(source.responseText, 'application/xml');
		
		var wersja = dom.getElementsByTagName(skrypt_nazwa)[0].textContent;
		var msg;
		try { msg = dom.getElementsByTagName(skrypt_msg)[0].textContent; } catch(e) { msg = 'Uwaga! Jest uaktualnienie do skryptu ' + skrypt_nazwa + '\nProszę pobrać nową wersję!'; }
		if (wersja != skrypt_wersja)
			alert(msg);
	}}
});

var punkty = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[7].getElementsByTagName('td')[1].innerHTML;

if (TEST)
	alert ('Odczytano punkty przeciwnika jako: '+punkty);

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://www.menelgame.pl/fight/overview/', onload: function (source)
	{
		if (source.status == 200)
		{
			var dom = document.createElement('html');
			dom.innerHTML = source.responseText;
			

			try { var range_min = dom.innerHTML.match(/od ([0-9]+) do ([0-9]+)/)[1];} catch(e) {if (TEST) alert('Nie mogę odczytać przedziału punktowego!'); return;}
			try { var range_max = dom.innerHTML.match(/od ([0-9]+) do ([0-9]+)/)[2];} catch(e) {if (TEST) alert('Nie mogę odczytać przedziału punktowego!'); return;}
			
			if (TEST)
				alert ('Odczytano przedział punktowy jako:\n'+range_min+' do '+range_max);
			
			punkty = punkty * 1;
			range_min = range_min * 1;
			range_max = range_max * 1;
			
			if (!((punkty < range_min) || (punkty > range_max)))
			{
				var test = document.getElementsByTagName('a');
				for (aa in test)
					if (test[aa].href.match('/fight') && test[aa].innerHTML.match('Atak'))
					{
						test[aa].style.color='green';
						test[aa].innerHTML = 'Atak&nbsp;jest&nbsp;możliwy';					
					}
			}
			else
			{
				var test = document.getElementsByTagName('a');
				for (aa in test)
					if (test[aa].href.match('/fight') && test[aa].innerHTML.match('Atak')) 
					{
						test[aa].innerHTML = 'Atak&nbsp;nie&nbsp;jest&nbsp;możliwy';
						test[aa].style.color='red';
					}
			}
		}
		else
		{
			if (TEST)
				alert('Nie mogę się połączyć i odczytać Twojego przedziału punktowego!');
			var test = document.getElementsByTagName('a');
			for (aa in test)
				if (test[aa].href.match('/fight') && test[aa].innerHTML.match('Atak')) 
				{
					test[aa].innerHTML = 'Atak&nbsp;-&nbsp;błąd&nbsp;połączenia...';
					test[aa].style.color='yellow';
				}
		}
	}
});