// ==UserScript==
// @name           Twitch Font Color Fix
// @namespace      void
// @description    Replaces Spring Green, among other, equally cryptic font colors from the chat on www.twitch.tv, with darker versions of the original color.
// @match          http://www.twitch.tv/*
// @include        http://www.twitch.tv/*
// @version        1.0
// ==/UserScript==

var springStyle = document.createElement("style");

springStyle.type = "text/css";
springStyle.textContent = '*[style*="#00FF7F"]{color: #007F3F !important;}*[style*="#9ACD32"]{color: #568000 !important;}*[style*="#00FF00"]{color: #007F00 !important;}';

document.head.appendChild(springStyle);