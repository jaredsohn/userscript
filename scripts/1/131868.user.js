// ==UserScript==
// @name		WirtualnaPolskaGoodNews
// @description	Zamienia treść nagłówków z newsów na wp na same pozytywne wiadomości
// @author		Jarosław Kowalczyk
// @license		GNU GPL v3
// @version		0.1
// @include		wp.pl
// ==/UserScript==
var elmModify = document.getElementById("bxWiadomosci");
dobreWiadomosci = "<header class='naglowekBoksu'>\n\
				<a class='tytul' href='http://wiadomosci.wp.pl' title='Przejdź do serwisu Wiadomości'>wiadomości</a>\n\
				</header>\n\
				<ul class='dot'>\
<li class='pierwszy'><a href='wp.pl' title='Więcej miejsc pracy.'>\
<img src='http://www.igabinet.pl/design/icons/satysfakcja-i-zadowolenie-z-unikalnej-jakosci-obslugi.png' alt=''><strong>Więcej miejsc pracy. Bezrobocie spada.</strong></a></li>\
				<li><a href='wp.pl' title='Zemsta Millera na Kwaśniewskim'>Podatki wreszcie niższe!</a></li>\
				<li><a href='wp.pl' title=''>Politycy nie biorą łapówek</a></li>\
				<li><a href='wp.pl'>Ceny paliw najniższe w Europie</a></li>\
				<li><a href='wp.pl'>Reprezentacja Polski wygrywa z Brazylią mecz piłki nożnej</a></li>\
				<li><a href='wp.pl'>Polski film faworytem w Cannes</a></li>\
				<li><a href='wp.pl'>Polska w czołówce najbogatszych krajów</a></li>\
				<li><a href='wp.pl'>Przygotuj się - darmowe wakacje dla każdego - wszędzie.</a></li>\
				</ul>";
elmModify.innerHTML = dobreWiadomosci;
	
