// ==UserScript==
// @name        Sinisterly On Rails - Background
// @namespace   Uzinero and Duubz
// @description Sinisterly On Rails Background
// @include     https://sinister.ly/*
// @include     https://www.sinister.ly/*
// @version     1
// @grant       none
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    'body {' +
	'background:url(http://i.imgur.com/oBS3K3H.jpg) top left repeat fixed;}' +
	'color: #fff;' +
	'text-align: center;' +
	'line-height: 1.4;' +
	'margin: 0;' +
	'background-attachment: fixed;' +
	'font-family: Arial, Helvetica, Tahoma, Verdana;' +
	'font-size: 13px;' +
'}';
document.getElementsByTagName("HEAD")[0].appendChild(link);