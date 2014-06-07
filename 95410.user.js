// ==UserScript==
// @name           Ratia como lo pibe
// @namespace      rllzzx
// @include        http://www.kongregate.com/games/*
// ==/UserScript==

var tiempo = Math.floor(Math.random()*(3461-1781+1)+1781);
var star = Math.floor(Math.random()*5+1)*2+3;

setTimeout('document.getElementById("below_game_star_ratings_block").childNodes[3].childNodes['+star+'].firstElementChild.onclick();',tiempo);
