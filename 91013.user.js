// ==UserScript==
// @name           dol2day appi background
// @namespace      www.dol2day.com
// @description    arbeit ist scheiße.
// @include        http://*.dol2day.com/*
// @include        http://*.dol2day.de/*
// ==/UserScript==


document.title = "Arbeit ist Scheiße, uh-uh";
var body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = "url(http://www.dol2day.com/img/ini/logo_appi_190x95.gif)";

