// ==UserScript==
// @name           e-przewodniki map enlarge
// @summary		   Script will enlarge embedded google map to usable size (1200x600 pixels by default)
// @author		   CoiL
// @include        http://e-przewodniki.pl/przewodnik*
// ==/UserScript==

var map_width = "1200px";
var map_height = "600px";
document.getElementById('td_table_right').style.width = map_width;
document.getElementById('map_over').style.width = map_width;
document.getElementById('map').style.width = map_width;
document.getElementById('map').style.height = map_height;
