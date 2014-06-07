// ==UserScript==

// @name           Deezer V 2.1

// @namespace      Enables disabled songs on Deezer

// @description    Diese Erweiterung erlaubt das Abspielen von gesperrten Songs auf der freien Musikplattform Deezer.com. Das Skript manipuliert die GeoIP Lokalisierung von eurem Herkunftsland in den von Frankreich. So sollten sich die meisten grau-markierten Songs abspielen können. Trotz der Tatsache dass man nun scheinbar aus Frankreich kommt, bleibt die Seite größtenteils auf Deutsch erhalten. Mfg, wirpo032

// @include        http://www.deezer.com/

// @include        http://www.deezer.com/*
// @include        http://deezer.com/
// @include        http://deezer.com/*
// @include        http://*.deezer.com/*

// ==/UserScript==
document.getElementById("flash").innerHTML = "<embed width=\"100%\" height=\"100%\" flashvars=\"urlIdSong=&amp;search=&amp;varemail=&amp;varuserid=&amp;lang=EN&amp;geoip=FR&amp;URL=0\" quality=\"high\" bgcolor=\"#444444\" name=\"dzflash\" src=\"/deezer_edna.swf?Version=2.0.0.2\" type=\"application/x-shockwave-flash\"/>";
document.getElementById("player").innerHTML = "<embed width=\"300\" height=\"310\" flashvars=\"lang=DE&listen=&geoip=FR\" quality=\"true\" bgcolor=\"#444444\" name=\"dzplayer\" id=\"dzplayer\" src=\"/player_flanders.swf?Version=2.0.0.2\" type=\"application/x-shockwave-flash\"/>";