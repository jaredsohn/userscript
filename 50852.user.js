// ==UserScript==
// @name           Season 10, Day 1
// @namespace      GLB
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

window.setTimeout( function() {

  var season = document.getElementById('season');
  season.innerHTML = "Season 10, Day 1";


}, 100);
