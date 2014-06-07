// ==UserScript==
// @name		Sprzedawanie puszek
// @description		Skrypt na razie tylko dla bumrise i jest nie skończony
// @version		1.2
// @author		mikskape
// @include		*bumrise.com/stock/bottle/*
// ==/UserScript==

//po jakim minimalnym kursie ma skrypt sprzedawac puszki
var min = 15;

//ile puszek ma sprzedawac za jednym razem
var ile = 30000;

var s_wersja = '1.2';
var s_info = 'http://userscripts.org/scripts/show/70250';
var s_url = 'http://userscripts.org/scripts/source/70250.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "tempfile.temp". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});


var kurs = document.getElementById('chkval').value.match(/[0-9]+/);
if (kurs >= min) {
var ilosc = document.getElementById('menge_verkauf');
var max = document.getElementById('max').value.match(/[0-9]+/);
if (ile <= max) {
ilosc.value=ile;
document.getElementById('content').getElementsByTagName('form')[0].submit();
}else{
ilosc.value=max;
document.getElementById('content').getElementsByTagName('form')[0].submit();
}
}else{
document.location.href="http://www.bumrise.com/stock/bottle/";
}