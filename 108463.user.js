// ==UserScript==
// @name           SkyIMDB
// @namespace      com.chohdry.sky
// @description    Fetch IMDB Rating
// @include        http://epgservices.sky.com/epg/*
// ==/UserScript==

var s = jQuery('span.genre:contains(Film)').first().parent().
var t = s.innerText.substring(4);
alert(t);
var http = new ActiveXObject("Microsoft.XMLHTTP");
http.open("GET", "http://www.imdbapi.com/?t=" + t, false);
http.send(null);

var imdbData = http.responseText;
var imdbJSON = eval("(" + imdbData + ")");

s.innerText = s.innerText + '(' +imdbJSON.Rating + ')';
alert(s.innerText);