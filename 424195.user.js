// ==UserScript==
// @name       Torrents from IMDB
// @namespace  http://www.google.com/
// @version    0.1
// @description  Show torrents from Kickass on IMDB Movie page for downloading; hover over the MovieMeter Icon to Access Click
// @include       http://*imdb.com/title/*
// @copyright  2014+, Anurag Ranjitkar
// ==/UserScript==

var loc = document.location.href;
var b = loc.slice(1,35);
var movieNumber = b.slice(-7);
var link = "\"" + "http://kickass.to/usearch/imdb%3A" + movieNumber + "\"";
var change = document.getElementById("meterSeeMoreRow");
change.innerHTML = "<a href=" + link + "><img src='http://kastatic.com/images/favicon.ico'></a>";






   