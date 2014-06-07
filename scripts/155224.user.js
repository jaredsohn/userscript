// ==UserScript==
// @name        TwitchColRemover
// @namespace   Laserbomb
// @description Removes left column
// @include     http://www.twitch.tv/*
// @include     https://www.twitch.tv/*
// @version     1
// ==/UserScript==

var playerDom = document.getElementById('player_col');
playerDom.style.marginLeft= "0px";

var lcloDom = document.getElementById('left_close');
lcloDom.style.display = "none";

var lcDom = document.getElementById('left_col');
lcDom.style.display = "none";
