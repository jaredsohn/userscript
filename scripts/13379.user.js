// ==UserScript==
// @name           IMDB'den Divxplanet'a Altyazı
// @description    IMDB'de filmin sayfasından direk divxplanettaki altyazılarına erişim
// @author         jnothing
// @version        0.1
// @include        http://www.imdb.com/title/*
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// ==/UserScript==

	

var adres=window.location.href;
var ilk='imdb.com/title/';
var imdbKod=adres.substring(adres.indexOf(ilk)+15);

imdbKod=imdbKod.replace('tt','');

if(imdbKod.indexOf('/')>0)
imdbKod=imdbKod.replace('/','');	
	





document.getElementById('tn15title').innerHTML+='<form method="post" action="http://www.divxplanet.com/index.php?page=showsubs">Altyazılar:<input type="hidden" name="imdb_id" value="'+imdbKod+'"><input type="submit" value="DivxPlanet"><input type=button value="OpenSubtitles" onClick="window.location.href=\'http://www.opensubtitles.org/tr/search2/sublanguageid-tur/imdbid-'+imdbKod+'\'"></form>';

		
			
			
	
	