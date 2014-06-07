// ==UserScript==
// @name           Kongregate Chat Deleter
// @namespace      http://www.overzealous.com
// @include        http://www.kongregate.com/games/*
// ==/UserScript==

var chat = document.getElementById("chat_container");
chat.parentNode.removeChild(chat);