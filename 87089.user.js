// ==UserScript==
// @name           WhatSnacks 2
// @namespace      http://dropbox.com
// @description    Midnight Snacks What.cd Linker
// @include        http://midnightsnacks.8chan.net/*
// ==/UserScript==

var artists = document.getElementsByClassName('artist');

for (i = 0; i < artists.length; i++) {
	var artistsNew = artists[i].innerHTML.split(" ").join("+");
	artists[i].innerHTML = "<a href=\"http://what.cd/artist.php?artistname="+artistsNew+"\">"+artists[i].innerHTML+"</a>";
}