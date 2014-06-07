// ==UserScript==
// @name        streamcloud.eu HTML5 Player
// @namespace   streamcloud.euHTML5player
// @description Adds HTML5player and removes Flash player
// @include     http://streamcloud.eu/*
// @version     1
// @grant       none
// ==/UserScript==

var videourl = document.getElementsByTagName("script")[9].innerHTML.split('"')[7];
document.getElementById("player_code").innerHTML = '<video style="width: 900px; height: 537px; background: black;" autoplay="" controls="" src="' + videourl + '"></video>';