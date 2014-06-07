// ==UserScript==
// @name			Lastfm.pl Ads Remover
// @namespace		http://www.pati.tivi.net.pl/p/greasemonkey/
// @description		skrypt usuwający reklamy na stronach użytkowników w lastfm.pl
// @include			http://*.lastfm.pl/user/*
// ==/UserScript==

/* wersja 0.1 */

/* funkcja główna usuwająca reklamy */
function main()
{
		var LastAd_Top = document.getElementById('LastAd_Top'); /* uchwyt do elementu LastAd_Top*/
		if(LastAd_Top) /* jeżeli reklama istnieje */
		{
			LastAd_Top.parentNode.removeChild(LastAd_Top); /* usuń reklamę */
		}
		
		var LastAd_TopRight = document.getElementById('LastAd_TopRight'); /* uchwyt do elementu LastAd_TopRight*/
		if(LastAd_TopRight) /* jeżeli reklama istnieje */
		{
			LastAd_TopRight.parentNode.removeChild(LastAd_TopRight); /* usuń reklamę */
		}
}

/* wywołanie funkcji głównej */
main();

/* Lista zmian:

0.1 - początkowe wydanie

*/
