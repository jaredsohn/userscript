// ==UserScript==
// @name           BR αlpha - VideoURL-Extraktor
// @namespace      videox
// @description    Ersetzt die Seite durch die URL des Videos.
// @include        http://www.br-online.de/br-alpha/alpha-centauri/*
// ==/UserScript==

scripts = document.getElementsByTagName("script");
for each (var script in scripts) {
	if (script.firstChild != null) {
		medium = /(player\.avaible_url\['microsoftmedia'\]\['2'\] = "([^"]*)";)/gm(script.firstChild.data);
		if (medium && medium[2]) window.location = medium[2];
	}
}