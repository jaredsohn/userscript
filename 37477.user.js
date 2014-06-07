// ==UserScript==
// @name Deezer Version 2 Unlocker (corrected)

// @namespace Enables disabled songs on Deezer

// @description Enables disabled (grayed-out) songs on Deezer. This script replaces the GeoIP location with French, but leaves (most of) the actual Deezer application in English.

// @include http://www.deezer.com/

// @include http://www.deezer.com/*
// @include http://deezer.com/
// @include http://deezer.com/*
// @include http://*.deezer.com/*

// ==/UserScript==
document.getElementById("flash").innerHTML = "<embed width=\"100%\" height=\"100%\" flashvars=\"urlIdSong=&amp;search=&amp;varemail=&a mp;varuserid=&amp;lang=EN&amp;geoip=FR&amp;URL=0\" quality=\"high\" bgcolor=\"#444444\" name=\"dzflash\" src=\"/deezer_duffman.swf?Version=2.0.0.2\" type=\"application/x-shockwave-flash\"/>";
document.getElementById("player").innerHTML = "<embed width=\"300\" height=\"310\" flashvars=\"lang=EN&listen=&geoip=FR\" quality=\"true\" bgcolor=\"#444444\" name=\"dzplayer\" id=\"dzplayer\" src=\"/player_duffman.swf?Version=2.0.0.2\" type=\"application/x-shockwave-flash\"/>";
Search all posts
Voices
Sponsored links
