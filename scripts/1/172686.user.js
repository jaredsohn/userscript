// ==UserScript==
// @id             twitchtvdontwatchonxbox@phob.net
// @name           Twitch.TV Don't Watch on Xbox
// @version        0.15
// @namespace      phob.net
// @author         wn
// @description    Get rid of the "Watch on Xbox" button
// @include        http://*.twitch.tv/*
// @exclude        http://api.twitch.tv/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/172686.meta.js
// ==/UserScript==

var style = document.createElement("style");
style.setAttribute("type", "text/css");
style.textContent = ".xbox_button { display: none !important }";
document.body.appendChild(style);
