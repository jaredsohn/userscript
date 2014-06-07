// ==UserScript==
// @name        Colorless Twitch Chat
// @namespace   olddragon2a
// @description Removes colors from the twitch chat.
// @include     http://www.twitch.tv/*
// @version     1.0
// @grants      none
// ==/UserScript==

jQuery('head').append("<style>" +
"#chat_line_list li .nick," +
"#chat_line_list li .chat_line { color: #000 !important; }" +
"</style>");
