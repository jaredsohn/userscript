// ==UserScript==
// @name           Wikipedia_Russian_No_blackout
// @namespace      Wikipedia_Russian_No_blackout
// @description    Allows to browse Russian Wikipedia during the blackout | Позволяет использовать русскую википедию
// @include        http://ru.wikipedia.org/wiki/*
// ==/UserScript==

document.getElementById('blackout').style.display = 'none';
var toShow = ['bodyContent', 'firstHeading', 'mw-head', 'mw-panel', 'footer']
for (i in toShow)
	document.getElementById(toShow[i]).style.display = 'block';