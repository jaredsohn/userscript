// ==UserScript==
// @name       Yes, I want to "Go to video page"
// @namespace  http://www.google.de/
// @version    0.1
// @description  Automatic click-through on one-tvshows.eu
// @match      http://one-tvshows.eu/tv/proxy/id/*/hash/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

var a = $("div#videogoto").find("a").attr('href')
if(a) {
    window.location.replace(a);
}
