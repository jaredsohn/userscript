// ==UserScript==
// @id             twitchtvnochatspellchecker@phob.net
// @name           Twitch.TV No Chat Spell Checker
// @version        0.16
// @namespace      phob.net
// @author         wn
// @description    Attempts to disable spell checking on the chat input area
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/161498.meta.js
// ==/UserScript==

var c = document.getElementById("chat_text_input");
c && c.setAttribute("spellcheck", false);
