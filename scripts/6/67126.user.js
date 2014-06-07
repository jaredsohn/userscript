// ==UserScript==
// @name           Oddawanie Datków
// @namespace      x
// @include        *menelgame.pl/*
// @exclude        *board.menelgame.pl/*
// ==/UserScript==


//			******************************************************************
//			*                                                                *
//			*                      copyright by Yeramihi                     *
//			*                                                                *
//			******************************************************************


var skrypt_nazwa = 'oddawanie_datkow';
var skrypt_msg = 'oddawanie_datkow_msg';
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
		try { msg = dom.getElementsByTagName(skrypt_msg)[0].textContent; } catch(e) { msg = 'Uwaga! Jest uaktualnienie do skryptu ' + skrypt_nazwa + '\nProsze pobrac nowa wersje!'; }
		if (wersja != skrypt_wersja)
			alert(msg);
	}}
});

var TEST = false;

if (!document.body.innerHTML.match('Stopka redakcyjna'))
	return;

if (TEST) alert ('Tryb testowy!');
var skrypt_dziala = GM_getValue('skrypt_dziala', 'tak');
var adres_dodawania = 'menelgame.pl/change_please/statistics/';
var ad2 = 'menelgame.pl/overview/';

if (TEST) alert (skrypt_dziala);

var koniec = GM_getValue('koniec', 'nie');
if (koniec.match('tak'))
	return_to_begining();
	
if (skrypt_dziala.match('tak'))
{
	if (TEST) alert ('oddaj_datki');
	oddaj_datki();
} else
{
	if (TEST) alert ('podaj_opcje');
	podaj_opcje();
}

function oddaj_datki()
{
	if (TEST) alert ('inside oddaj_datki');
	
	var pozycja_do_oddania = GM_getValue('pozycja', 1);
	if (pozycja_do_oddania > 9)
	{
		GM_setValue('skrypt_dziala', 'nie');
		GM_setValue('koniec', 'tak');
	}
	var strona = Math.floor(pozycja_do_oddania/20); strona++;
	var pozycja = pozycja_do_oddania % 20; 
	if (TEST) alert ('strona: ' + strona + '\nPozycja: ' + pozycja);
	if (pozycja == 0)
	{
		strona--;
		pozycja = 20;
	}
	
	var adres = 'http://' + adres_dodawania + strona + '/';
	if (TEST) alert (adres);
	GM_xmlhttpRequest(
	{
		method: 'GET', url: adres, onload: function(source)
		{
			if (TEST) alert (source.status);
			if (TEST) alert('odczytanie dawcy');
			var dom = document.createElement('html');
			dom.innerHTML = source.responseText;
			
			if (TEST) alert (source.status);
			
			if (source.status != 200)
				return;
		
			pozycja_do_oddania++;
			GM_setValue('pozycja', pozycja_do_oddania);
			
			try 
			{
				var temp = dom.getElementsByTagName('table'); 
				var wpis = temp[0].getElementsByTagName('tr');
				try { var adres = wpis[pozycja].getElementsByTagName('td')[2].getElementsByTagName('a')[0].href; } catch(e) {var adres = 'http://menelgame.pl'; }
			} catch(e) 
			{
				pozycja_do_oddania--;
				var adres = document.URL;
			}
			
			if (TEST) alert(adres);
			window.location.replace(adres);
		}
	});
}

function podaj_opcje()
{
	if (TEST) alert ('inside podaj_opcje');
	if (document.URL.match(adres_dodawania) || document.URL.match(ad2))
	{
		if (TEST) alert ('adres_dodawania');
		var przycisk = document.createElement('li');
		przycisk.addEventListener('click', function(event) { uruchomienie_skryptu(); }, false);
		przycisk.innerHTML = '<a> Oddaj datki </a>';
		var ul = document.getElementsByTagName('ul');
		var x;
		for (x = 0; x <= ul.length; x++)
			if (ul[x].innerHTML.match('bilansy'))
			{
				ul[x].appendChild(przycisk);
				if (TEST) alert ('przycisk dodany');
			}
	}		
}


function uruchomienie_skryptu()
{
	if (TEST) alert ('uruchomienie_skryptu');
	
	GM_setValue('pozycja', 1);
	GM_setValue('skrypt_dziala', 'tak');
	oddaj_datki();
}

function return_to_begining()
{
	GM_setValue('skrypt_dziala', 'nie');
	var ad = 'http://menelgame.pl/change_please/statistics/';
	GM_setValue('koniec', 'nie');
	window.location.replace(ad);
}
