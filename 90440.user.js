// ==UserScript==
// @name         MTV Videotar player
// @namespace    http://nincs.hu
// @description  Replaces the embedded player with an URL on the Hungarian movie site videotar.mtv.hu
// @include      http://videotar.mtv.hu/*
// @exclude      http://videotar.mtv.hu/VideoPortal/*
// ==/UserScript==



var regexp = new RegExp("http://streamer.carnation.hu.*.wmv","m");
var filmURL = regexp.exec(document.body.textContent);

var elmNewContent = document.createElement('a');
elmNewContent.appendChild(document.createTextNode("IDE KATTINTS, HOGY LEJATSSZA VLC-VEL!!!!"));
elmNewContent.setAttribute('href',filmURL);
var elmExtra = document.getElementById('Player');
elmExtra.parentNode.replaceChild(elmNewContent, elmExtra);
