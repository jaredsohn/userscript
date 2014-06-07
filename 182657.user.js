// ==UserScript==
// @name        Audio for plug
// @namespace   http://userscripts.org/scripts/source/182657.user.js
// @include     http://plug.dj/*
// @version     1
// @grant       none
// ==/UserScript==

API.on(API.CHAT, callback); function callback(data) { document.getElementById("chat-sound").playChatSound() }