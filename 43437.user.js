// ==UserScript==
// @name           Full Allegro Archive
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace      www.horacy.art.pl/full-allegro-archive-koniec-z-aukcjami-przeniesionymi-do-archiwum/
// @description    Skrypt dodaje w serwisie Allegro.pl linki do Publicznego Archiwum Allegro, umozliwiajac przegladanie starych aukcji, niedostepnych publicznie. Kontakt: horacy@houseofplates.pl
// @include        http*://*allegro.pl/*
// @updateURL	   https://userscripts.org/scripts/source/43437.user.js
// @downloadURL	   https://userscripts.org/scripts/source/43437.user.js
// @version        2.3
// @homepageURL	   https://userscripts.org/scripts/show/43437
/* History
// v. 2.3 - 2013.04.15
// - Zaktualizowano skrypt, aby działał z nową wersją Allegro
// - Dodano mechanizm automatycznej aktualizacji
// - Przearanżowano wygląd
// - możliwość wsparcia FAA
// v. 2.2 - 2012.04.13
// - Poprawiono wyrażenia regularne, bo znaleziono uga buga i nie wszystko działało
// v. 2.1 - 2012.04.12
// - przepisany od podstaw kod w oparciu o JQUERY, co umożliwi szybki rozwój i moją błyskawiczną reakcję na zmiany w Allegro
// - wsparcie dla Google Chrome
// - zmiany graficzne
// - Dostosowanie do ostatnich zmian na Allegro - przywrócono działanie detektywa i archiwum aukcji na wszystkich podstronach, czyli:
// - Detektyw: na stronach produktu, na stronach użytkownika, na liście kontrahentów
// - Archiwum: na stronie informującej, że aukcja jest już niedostępna i została przeniesiona do archiwum
// v. 1.02 - 2011.10.21
// - felas mod
// v. 1.01 - 2009.01.26
// - Poprawiono support dla Opery (@include http*://*allegro.pl/* ;)
// v. 1.0 - 2009.01.15
// - Poprawiono żenujący bug z zielonymi komunikatami, które bywały podmieniane na numer aukcji
// - Serwis paa.pl zmienił system wyszukiwania i prezentacji wyników, przez co Full Allegro Archive przestało działać. Ta wersja przywraca prawidłowe działanie.
// - Skrypt będzie działać także na stronach typu moto.allegro.pl i podobnych (thx to Pawelsky)
// v. 0.998 - 2009.01.10 (środek nocy, po pijaku)
// - problem był z wyświetlaniem niektórych linków. Naprawiłem. A co...
// v. 0.997 - 2009.01.10 (pora obiadowa, bez obiadu)
// - Bug fixed: http://allegro.pl/show_user_auctions.php?uid=* interpretuje jako aukcje zamieniajac nazwe uzytkownika na link do archiwum aukcji o numerze uzytkownika
// - Od tej wersji skrypt uruchamia się na WSZYSTKICH podstronach wewnątrz allegro.pl
// - Uaktualniono linki do skryptu FAA
// - Naprawiono bug, który podmieniał wszystkie zielone mesydże na numery aukcji
// v. 0.900 - 2009.01.10 (rano, przed śniadaniem i przed WOSP)
// - Bug fix: Linki na stronach nieznalezionych auckji generowane są dobrze dla http://allegro.pl/show_item.php?item=*, ale zle dla tych http://allegro.pl/item*_*.html. Naprawiono.
// - wyświetlanie DETEKTYWA na stronach listy bieżących aukcji danego użytkownika
// - wyświetlanie linku do DETEKTYWA użytkownika, którego stronę właśnie przeglądamy (detektywi kontrahentów są już wyświetlani)
// - skrypt dorysowuje odpowiednie linki także w panelu administracyjnym (my_allegro.php*)
// v. 0.789
// - Poprawiono bug z niewłaściwym podpinaniem detektywów pod nazwy użytkowników
// - Zmiana "Powered by" na "Wspierane przez"
// v. 0.777 - 2009.01.09
// - przy nazwach loginów użytkowników dodaje link do DETEKTYWA serwisu paa.pl, dzięki czemu jednym kliknięciem można prześledzić historię transakcji użytkownika i otrzymanych za nie komentarzy - w przejrzystej tabelce z tytułami aukcji, obrazkami, etc.
// v. 0.666 - 2009.01.08 :
// - na stronach użytkownika podmienia “numery” niedostępnych dla zwykłych użytkowników aukcji, na odpowiednie linki prowadzące do serwisu Publiczne Archiwum Allegro.
// - na stronach nieistniejących aukcji wyświetla stosowny link wraz z informacją o możliwości obejrzenia tej aukcji w zewnętrznym serwisie
*/

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {



	// SZUKANIE NAZWY UŻYTKOWNIKA

		// strona produktu
			var username = $('.sellerDetails > dl dt').contents().filter(function() {return this.nodeType == 3;}).filter(function() {return !!$.trim( this.innerHTML || this.data ); }).first().text();
		// strona szczegółow usera (pierwsza nazwa usera nielinkowana, stąd problem)
			if(!username)
				username = $('.uname').contents().filter(function() {return this.nodeType == 3;}).filter(function() {return !!$.trim( this.innerHTML || this.data ); }).first().text()

			var detektyw = '<a href="http://archiwumallegro.pl/detektyw/?search='+username+'" style="color:black; font-weight:bold;">Detektyw + archiwum</a><br/><a href="http://www.horacy.art.pl/full-allegro-archive-koniec-z-aukcjami-przeniesionymi-do-archiwum/" style="text-decoration:none;font-size:0.8em;">Funkcja dostępna dzięki <strong>Full Allegro Archive</strong></a><br /><a href="http://www.houseofplates.pl" style="text-decoration:none;font-size:0.8em;">&copy; <strong style="background:white">houseofplates.pl</strong></a>';
		
	// DODAWANIE DETEKTYWA

		// strona produktu
			$('.sellerDetails dl').first('dd').append('<dd>'+detektyw+'</dd>');
		// strona użytkownika
			$('ul.links_to_left').prepend('<li>'+detektyw+'</li>');
		// strona użytkownika - inni użytkownicy na liście
			$('#flpw .uname a').each(function(){
				$(this).parent().append(' <a href="http://archiwumallegro.pl/detektyw/?search='+$(this).html()+'" style="color:black; font-weight:bold;">Detektyw</a> <a href="http://www.horacy.art.pl/full-allegro-archive-koniec-z-aukcjami-przeniesionymi-do-archiwum/" style="text-decoration:none;font-size:0.8em;"><strong>FAA</strong></a> <a href="http://www.houseofplates.pl" style="text-decoration:none;font-size:0.8em;">&copy; <strong style="background:white">HoP</strong></a>');
			});
		
		

	// DODAWANIE LINKU DO ARCHIWUM

		// strona nieznalezionej aukcji
		/*
			// STARE ALLEGRO:
			if(document.location.href.indexOf("/itemNotFound")!=-1)
			{
				var aukcja = document.location.href.split('item=')[1].split('&')[0];
				
				//działanie
				// http://allegro.pl/ShowItem2.php/itemNotFound/?item=1989434203
				//niedziała
				// http://allegro.pl/ShowItem2.php/itemNotFound/?item=2057177071&title=wyspy-owcze-s-a-n-d-u-r 
				
				$('.main').append('<p>Nie wszystko jednak stracone! <a href="http://archiwumallegro.pl/szukaj/?itemid='+aukcja+'" style="color:black; font-weight:bold;">Kliknij tutaj, aby zobaczyć ją w Publicznym Archiwum Allegro!</a></p><p><a href="http://www.horacy.art.pl/full-allegro-archive-koniec-z-aukcjami-przeniesionymi-do-archiwum/" style="text-decoration:none;">Funkcja dostępna dzięki Full Allegro Archive</a><br /><a href="http://www.houseofplates.pl" style="text-decoration:none;font-size:0.8em;">&copy; <strong>houseofplates.pl</strong></a></p>');
			}		
		*/
			// NOWE ALLEGRO:
			if(document.location.href.indexOf("/itemNotFound")!=-1)
			{
			
				var aukcja = document.location.href.split('item=')[1].split('&')[0];
				
				//działanie
				// http://allegro.pl/ShowItem2.php/itemNotFound/?item=1989434203
				//niedziała
				// http://allegro.pl/ShowItem2.php/itemNotFound/?item=2057177071&title=wyspy-owcze-s-a-n-d-u-r 
				
				$('.alert-msg-main').append('<p style="margin-top:20px;"><a href="http://archiwumallegro.pl/szukaj/?itemid='+aukcja+'" style="color:black; font-weight:bold;text-decoration:none;" target="_blank">Kliknij tutaj, aby zobaczyć ją w Publicznym Archiwum Allegro!</a><br /><a href="http://www.horacy.art.pl/full-allegro-archive-koniec-z-aukcjami-przeniesionymi-do-archiwum/" style="text-decoration:none; font-size:0.8em">Przeglądanie archiwum dostępne dzięki <strong>Full Allegro Archive</strong></a>.</p><p style="margin-top:20px;"><div style="font-size:0.8em; color: darkred; text-align: center;"><strong>Podoba Ci się? Wesprzyj projekt FAA</strong> dobrowolnym datkiem na 50 1020 5558 1111 1405 0750 1046</div><br /><a href="http://www.houseofplates.pl" style="text-decoration:none;font-size:0.8em;">&copy; <strong>houseofplates.pl</strong></a></p>');
			}


});


// ==/UserScript==
(function()
{

}) ();
