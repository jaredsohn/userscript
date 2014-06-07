// ==UserScript==
// @name           WhatFork
// @namespace      http://userscripts.org
// @description    Pitchfork What?
// @include        http://pitchfork.com/reviews/albums/*
// ==/UserScript==

var protocol = 'http'; // change to 'https' if you use SSL on What.CD

var artist = document.querySelector('.review-info h1 a').innerHTML;
var album = document.querySelector('.review-info h2').innerHTML.trim();

var albumSearch = document.createElement('a');
albumSearch.innerHTML = 'Search for album on What.CD.';
albumSearch.href = protocol + '://what.cd/torrents.php?artistname=' + artist.replace(' ', '+') + '&action=advanced&order_by=time&order_way=desc&groupname=' + album.replace(' ', '+');
var artistSearch = document.createElement('a');
artistSearch.innerHTML = 'Search for artist on What.CD.';
artistSearch.href = protocol + '://what.cd/artist.php?artistname=' + artist.replace(' ', '+');

document.querySelector('.posted-at').appendChild(document.createElement('br'));
document.querySelector('.posted-at').appendChild(albumSearch);
document.querySelector('.posted-at').appendChild(document.createElement('br'));
document.querySelector('.posted-at').appendChild(artistSearch);