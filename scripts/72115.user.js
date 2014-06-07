// ==UserScript==
// @name           statistiques
// @namespace      statistiques
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

var urlInfos = window.location.href.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/);
document.getElementById('menu_interactif').innerHTML = document.getElementById('menu_interactif').innerHTML.replace(/<\/li>\n<\/ul>/, '</li>\n<li><a href="http://jvstats.planet-shitfliez.net/stats/inflate.php?num=' + urlInfos[2] + '" target="_blank">Statistiques</a></li>\n</ul>');