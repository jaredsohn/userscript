// ==UserScript==
// @name        ppshower
// @namespace   ppshower
// @description calculate and show pp next to star difficulty
// @include     http://osu.ppy.sh/s/*
// @include     http://osu.ppy.sh/b/*
// @include     https://osu.ppy.sh/s/*
// @include     https://osu.ppy.sh/b/*
// @version     1
// @grant       none
// ==/UserScript==
 
var starfield = document.getElementById("starfield");
var table = document.getElementById("songinfo");
var table_info = table.rows[0].cells[5].textContent;
table_info = table_info.substring(2, table_info.length-1);
 
var stars = parseFloat(table_info);
var pp = Number((Math.pow(stars,3)*4.356).toFixed(0));
var lowpp = Number((pp-(pp*0.1092)).toFixed(0));
var highpp = Number((pp+(pp*0.1092)).toFixed(0));
 
table_info = "  pp: " + lowpp + " - " + highpp + "  (" + pp + ")";
 
table.rows[0].cells[5].innerHTML = table.rows[0].cells[5].innerHTML + table_info;