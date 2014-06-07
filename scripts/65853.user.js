// ==UserScript==
// @name           Oddawanie datków
// @namespace      Oddawanie datków v.4.0
// @description    Skrypt do oddawania datków na menelgame.pl
// @include        *menelgame.pl/*
// ==/UserScript==


/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/



var version = '1.0a';
var version_hash = 'b56400763a5204cc92e98a6d001bfd4b';
var adres = 'http://userscripts.org/scripts/source/65853.user.js';
var nazwa = 'Oddawanie Datków';


GM_xmlhttpRequest(
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  method: 'GET', url: adres, onload: function(source)
  {
  	var wpis = document.createElement('html');
  	wpis.innerHTML = source.responseText;
  	


	if (wpis.innerHTML.match('CypyRight by Yeramihi'))
    if (!((wpis.innerHTML.match(version_hash))))
    {
      alert ('Pojawiła się nowa wersja skryptu ' + nazwa + '! \Za chwilę zostanie pobrana nowa wersja skryptu, proszę potwierdzić instalację...');
      window.location.replace(adres);
      return;
    }
  }
});


var skrypt_dziala = GM_getValue('dziala', 'nie');
if (skrypt_dziala.match('tak'))
	dzialanie_skryptu();
else
{

	var adres = document.URL;
	if (adres.match('overview'))
	{
		var wpis = document.getElementsByTagName('ul');
		for (x in wpis)
		{
			if (wpis[x].innerHTML.match('Statystyki datk'))
			{
				var p = document.createElement('li');
				p.innerHTML = '<a class="btn5"> Oddawanie datków </a>';
				p.addEventListener('click', function(event) { uruchomienie_skryptu(); }, false);
				document.getElementsByTagName('ul')[x].appendChild(p);
			}
		}
	}
}


function uruchomienie_skryptu()
{
		GM_setValue('dziala', 'tak');
		GM_setValue('pozycja', 1);
		window.location.reload();
}

function dzialanie_skryptu()
{
	var datek = GM_getValue('pozycja', 1);
	if (datek >= 100)
	{
		GM_setValue('dziala', 'nie');
		GM_setValue('datek', 0);
		window.location.replace('/change_please/statistics/');
	}
	
	var strona = Math.floor(datek/20); strona++;
	var pozycja = datek % 20;
	
	if (pozycja == 0)
	{
		pozycja == 20;
		strona--;
	}
	

	var adres = '/change_please/statistics/' + strona + '/';
	GM_xmlhttpRequest(
	{
		method: 'GET', url: adres, onload: function(source) 
		{
			
			var dom = document.createElement('html');
			dom.innerHTML = source.responseText;
			
			try
			{
				
				var temp = dom.getElementsByTagName('table');
				var wpis = temp[0].getElementsByTagName('tr');
				try { var adres = wpis[pozycja].getElementsByTagName('td')[2].getElementsByTagName('a')[0].href; } catch(e) { var adres = 'http://menelgame.pl'; }
				datek++;
				GM_setValue('pozycja', datek);
				window.location.replace(adres);
				
			} catch(e)
			{
				window.location.reload();
			}
		}
	});
}