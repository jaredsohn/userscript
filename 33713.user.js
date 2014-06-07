// ==UserScript==
// @name           BiblioNETka - Schowek AutoCheck
// @namespace      http://draakhan.info/greasemonkey/
// @description    Przy dodawaniu ksiazki do schowka automatycznie zaznacza checkbox 'Mam'
// @include        http://biblionetka.pl/schowek_adnotacja.asp?kat=*&kid=*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js
// ==/UserScript==

(function () {
	$("input[name='mam']").attr('checked', 'checked');
}());
