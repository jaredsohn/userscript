// ==UserScript==
// @name			Wrzuta.pl - pobieranie utworów
// @description		Dodaje link do pobierania utworu - bez serwisów pośredniczących, po prostu dostaje się do pliku na serwerze wrzuty
// @include			http://*.wrzuta.pl/audio/*
// ==/UserScript==

document.title=document.title.replace("WRZUTA - ","");var b=document.location.href.replace(/(http:\/\/[^\/]+)\/audio\/(.*)/g,"$1/xml/plik/$2/0wn3d/wrzuta.pl/undefined/");c=new XMLHttpRequest();c.open("GET",b,false);c.send(null);var d=escape(c.responseXML.documentElement.getElementsByTagName("fileId")[0].textContent);
var l = document.createElement("a");
l.setAttribute("href", unescape(d));
var t = document.createTextNode("Pobierz");
l.appendChild(t);
var o = document.getElementById("comments");
o.parentNode.insertBefore(l, o.previousSibling.previousSibling);