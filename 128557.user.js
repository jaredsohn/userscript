// ==UserScript==
// @name           Bootleggers Friends Chat Disabler
// @namespace      bl_friends_chat_hide
// @description    Hides the friends chat box
// @include        http://www.bootleggers.us/*
// ==/UserScript==

element = document.getElementById("bar");
element.parentNode.removeChild(element);