// ==UserScript==
// @name           Advent Calendar
// @description    Reloads the page for AC
// @include        http://www.neopets.com/winter/process_adventcalendar.phtml
// ==/UserScript==

var singleDay = 86400000 // 1000 ms/s * 60s/min * 60min/hr * 24hr

window.setTimeout(function(){window.location.reload();},singleDay);