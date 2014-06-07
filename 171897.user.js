// ==UserScript==
// @name        Twitch.tv Chat Text Shadow
// @namespace   twitch.tv
// @description Customizes Twitch Chat by adding a text shadow, increases font size slightly, and bolds text.
// @include     http://*.twitch.tv/*
// @version     1.1
// @require		http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
GM_addStyle("#chat_line_list li {font-size:10pt;font-weight:bold;list-style: none outside none;text-shadow: 1px 1px 1px #9A9A9A;}"); 