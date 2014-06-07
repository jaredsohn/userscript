// ==UserScript==
// @name        Twitch.TV Go Away Chat
// @version    0.2
// @description Loads straight in archive mode
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://www.twitch.tv/directory*
// @exclude        http://www.twitch.tv/inbox*
// @exclude        http://www.twitch.tv/subscriptions*
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$("#archives").css({"display":"block"});