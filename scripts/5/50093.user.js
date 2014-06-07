// ==UserScript==
// @author         Christian Daxberger (http://christian-daxberger.de)
// @name           Lokalisten Notifier
// @description    Zeigt ein blinkendes Ausrufezeichen vor dem Seitentitel, wenn z.B. neue Nachrichten verfügbar sind.
// @namespace      de.christian-daxberger
// @include        http://*lokalisten.de/*
// ==/UserScript==

var l_infobar = document.getElementById('l_infobar');
if (typeof l_infobar != 'undefined' && l_infobar.getElementsByTagName('a').length > 1) {
	// Neue Infos vorhanden
	// Titel flashen...
	window.setInterval(function () {
			if (document.title.substr(0, 4) != '/!\\ ') {
				document.title = '/!\\ ' + document.title;
			} else {
				document.title = document.title.substr(4, document.title.length - 4);
			}	
		}, 1000);
}