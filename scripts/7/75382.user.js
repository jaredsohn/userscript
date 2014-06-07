// ==UserScript==
// @name           4shared
// @namespace      nima
// @description    Skrypt automatyzujacy pobieranie ze strony http://www.4shared.com
// @include        http://www.4shared.com/get/*
// @include        http://www.4shared.com/file/*
// ==/UserScript==

if (window.location.href.indexOf("get")!=-1) { //jesli strona to http://www.4shared.com/get/*
	var abcdef=setTimeout("document.location=document.getElementById('divDLStart').innerHTML.substring(document.getElementById('divDLStart').innerHTML.indexOf('http'),document.getElementById('divDLStart').innerHTML.indexOf('>Pobierz')-1)",document.getElementById("downloadDelayTimeSec").innerHTML*1000); //Za liczbe sekund podanych w obiekcie "downloadDelayTimeSec" przejdz na odpowiednia strone
} else { //jesli strona to http://www.4shared.com/file/*
	for (i=0;i<=document.links.length;i++) { //sprawdz kazdy link
		if (document.links[i].href.indexOf("http://www.4shared.com/get/")!=-1) window.location=document.links[i].href; //jesli prowadzi do http://www.4shared.com/get/* przejdz do niego
	}
}
