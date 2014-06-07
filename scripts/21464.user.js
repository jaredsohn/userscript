// ==UserScript==
// @name           GWB: Solve arithmecial problem
// @description    Löst die Rechenaufgabe automatisch, die kommt, wenn man ein Kommentar schreiben will ohne angemeldet zu sein
// @namespace      http://nohomepageyet.de
// @include        http://www.googlewatchblog.de/*
// ==/UserScript==

var main = document.getElementById('main');

if(main != null)
{
	var solution = main.childNodes[22].childNodes[4].childNodes[3];
	var calculated = eval(main.childNodes[22].childNodes[4].childNodes[5].textContent);
		
	solution.value = calculated;
}