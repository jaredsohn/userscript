// ==UserScript==
// @id             twitchtvbigchat@phob.net
// @name           Twitch.TV Big Chat
// @version        0.15
// @namespace      phob.net
// @author         wn
// @description    Makes chat text a bit bigger... looks good on my TV.
// @include        http://*.twitch.tv/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/160445.meta.js
// ==/UserScript==

var s = document.createElement("style");
s.type = "text/css";
s.textContent = "#chat_lines * { font-size: 110% }";
document.body.appendChild(s);
