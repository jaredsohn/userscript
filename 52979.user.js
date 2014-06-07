// ==UserScript==
// @name           Wetteronline Radar Autoreload
// @namespace      http://userscripts.org/scripts/show/52979
// @description    Lädt die Seite http://www.wetteronline.de/daten/radarhtml/de/dnrw/radarf.htm
//                 immer wieder neu und zoomt sie - Author: me36835(at)gmail.com
// @include        http://www.wetteronline.de/daten/radarhtml/*
// ==/UserScript==
// D:\temp\Wetteronline Radar Autoreload.user.js

var tmp = document.body.innerHTML;
tmp = tmp.replace('de" border="0"','de" height="1023" width="870" border="0"');

document.body.innerHTML = tmp.replace('</body>','<table width="360px"><tr><td align="center" style="color: #0033FF; font-size: 11px; font-weight: normal;">Greasemonkey script <a style="text-decoration: underline;color: #0033FF; font-size: 11px; font-weight: normal;" href="http://userscripts.org/scripts/show/52979" target="_blank">Wetteronline Radar Autoreload</a> Version 2.00</td></tr></table></body>');

var interval = 1000*60*10; // 10 Minuten

window.gm_auto_reload = window.setTimeout("location.href='http://www.wetteronline.de/daten/radarhtml/de/dnrw/radarf.htm';", interval);
