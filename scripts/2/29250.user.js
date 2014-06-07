// ==UserScript==
// @name           torrents.ru new buttons
// @autor          MeXaon
// @email          svgmail@mail.ru
// @namespace      torrents.ru
// @description    torrents.tu new buttons
// @include        http://torrents.ru/forum/*
// @include        http://rutracker.org/*
// ==/UserScript==

function newButtons() {
	var cssString = ".txtb{" +
									"border-style: solid;" +
									"border-width: 2px;" +
									"border-top-color: #FFFFFF;" +
									"border-right-color: #000000;" +
									"border-bottom-color: #000000;" +
									"border-left-color: #FFFFFF;" +
									"padding: 2px;}" +
									".txtb:hover{" +
									"border-style: solid;" +
									"border-width: 2px;" +
									"border-top-color: #000000;" +
									"border-right-color: #FFFFFF;" +
									"border-bottom-color: #FFFFFF;" +
									"border-left-color: #000000;" +
									"padding: 2px;}"
	GM_addStyle(cssString);
}

var eventSource = (navigator.appName == 'Opera') ? document : window;
eventSource.addEventListener( 'load', newButtons, false);

