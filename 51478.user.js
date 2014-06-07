// --------------------------------------------------------------------------------------------------------
//	
//	Opis:
//
//	Skrypt dający dostęp nawet do przepełnionych pokoi na stronie www.kurnik.pl
//
//	Tagi specjalne:
//
//  Licencja: Creative Commons - Bez komercyjnego zastosowania - Na tych samych warunkach co 2.5 Polska
//	Informacje: http://creativecommons.org/licenses/by-nc-sa/2.5/pl
//	Pomoc: lashus@gmail.com
//
// --------------------------------------------------------------------------------------------------------
//
// ==UserScript==
// @name           Kurnik RoomService
// @author         Lashus
// @version        1.0
// @include        http://www.kurnik.pl/*
// @include        http://kurnik.pl/*
// @description    Skrypt dający dostęp nawet do przepełnionych pokoi
// ==/UserScript==

// obliczamy ilosc pelnych pokoi
var ilosc = document.body.getElementsByClassName('ktb med')[0].innerHTML.toLowerCase().match(/<span class="pale">\(pełny\)<\/span>/g).length;

// odnajdujemy prefix
var prefix = document.body.innerHTML.match(/http:\/\/ko\.kurnik\.pl\/\?(..)/)[0];
prefix = prefix.substr(prefix.length-2, 2);

// petla
for(i=0;i<ilosc;i++) {

	// zapisujemy w zmiennej nazwe pokoju
	var trafienie = document.body.getElementsByClassName('ktb med')[0].innerHTML.toLowerCase().match(/<b>(\w+)<\/b>/g)[0];
	var nazwa = trafienie.substr(3, trafienie.length-7);
	
	// zamieniamy na link
	document.body.getElementsByClassName('ktb med')[0].innerHTML = document.body.getElementsByClassName('ktb med')[0].innerHTML.replace(nazwa, '<b><a href="http://ko.kurnik.pl/?'+prefix+'='+nazwa+'"  onclick="javascript:rm(\''+prefix+'\',\'/?'+prefix+'='+nazwa+'\'); return false;">'+nazwa+'</a></b>');
	
}