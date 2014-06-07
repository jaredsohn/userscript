// ==UserScript==
// @name           TuneScoop Auto Descarga
// @namespace      TS Auto Descarga
// @description    Descarga automaticamente las canciones de TS
// @include        http://www.tunescoop.com/play/*
// HECHO POR JUANE - MADE BY JUANE
// ==/UserScript==
var inputs = document.getElementsByTagName("input");
for (var i in inputs) {
	if (inputs[i].value = "1") {
		inputs[i].parentNode.submit();
	}
}
var links = document.getElementsByTagName("a");
for (var i in links) {
	if(links[i].href.indexOf("www.tunescoop.com/download")>=0) {
		document.location=links[i].href;
		break;
	}
}