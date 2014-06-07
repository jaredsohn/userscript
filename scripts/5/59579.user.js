// ==UserScript==
// @name           tester sojuszu
// @namespace      Testowanie czy dany gracz jest w sojuszniczej bandzie
// @include        *menelgame.pl/profil/id:*
// ==/UserScript==


var TEST = false;

var skrypt_nazwa = 'tester_sojusznika';
var skrypt_msg = 'tester_sojusznika_msg';
var skrypt_wersja = '0.2';

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



var moja_banda, szukaj;

start()

if (TEST) alert ('Start');


function start()
{
	GM_xmlhttpRequest(
	{
		method: 'GET', url: 'http://www.menelgame.pl/gang/', onload: function (source)
		{
			if (source.status != 200)
			{
				alert('Problem z połączeniem ze stroną!\nNie wiem czy to jest Twój sojusznik!'); return;
			}
			
			var dom = document.createElement('html');
			dom.innerHTML = source.responseText;
			
			try {moja_banda = dom.getElementsByClassName('content')[0].getElementsByTagName('a')[6].href} catch(e) {alert('Problem z połączeniem ze stroną!\nNie wiem czy to jest Twój sojusznik!'); return;}
			if (TEST) alert(moja_banda);
			
			GM_xmlhttpRequest(
			{
				method: 'GET', url: moja_banda, onload: function(source)
				{
					if (source.status != 200) 
					{
						alert('Problem z połączeniem ze stroną!\nNie wiem czy to jest Twój sojusznik!'); return;
					}

					var dom2 = document.createElement('html');
					dom2.innerHTML = source.responseText;
					
					var szukaj = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[6].getElementsByTagName('td')[2].getElementsByTagName('a')[0];
					if (TEST) alert(szukaj.href+'\n'+szukaj.innerHTML);
					
					var temp = dom2.getElementsByTagName('a');
					
					if (szukaj.href == moja_banda)
						alert('Ten gracz jest w tej samej bandzie co ty!');
					for (x in temp)
						if (temp[x].href == szukaj.href)
							alert ('Ten gracz jest Twoim sojusznikiem!');
					
				}
			});			
		}
	});
}