// ==UserScript==
// @name			Odswiezanie strony gdy wystąpi błąd
// @description		Odswieza strone gdy wystapi blad "500 - Internal Server Error"
// @version			1.5
// @namespace		http://opuszczone.c0.pl
// @author			mikskape
// @include			http://*menelgame.pl*
// @include			http://opuszczone.c0.pl
// @license			http://opuszczone.c0.pl	
// ==/UserScript==

var s_wersja = '1.5';
var s_info = 'http://opuszczone.c0.pl';
var s_url = 'http://opuszczone.c0.pl';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Odświeżanie strony gdy wystąpi błąd". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});

//var button=(getElementsByTagName('input');
//button.setAttribute('onclick','javascript:location.reload()');
//button.setAttribute('value','Odśwież');
var title=(document.title);
var error=('500 - Internal Server Error');
if (title == error) {
	javascript:location.reload()
} else {
var error=('500 Internal Server Error');
if (title == error) {
	javascript:location.reload()
} else {
var error=('Maintenance downtime');
if (title == error) {
	javascript:location.reload()
} else {
}
}
}