// ==UserScript==
// @name           Twitch Emoticon Enhancer
// @namespace      void
// @description    Replaces all emoticons in the chat on www.twitch.tv with FrankerZ.
// @match          http://www.twitch.tv/*
// @include        http://www.twitch.tv/*
// @version        1.0
// ==/UserScript==

var emoticonStyle = document.createElement("style");

emoticonStyle.type = "text/css";
emoticonStyle.textContent = '*[class*="emoticon"]{background-image: url(http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3b96527b46b1c941-40x30.png) !important; width: 40px !important; height: 30px !important;}';

document.head.appendChild(emoticonStyle);