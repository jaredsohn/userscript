// ==UserScript==
// @name        Reddit - Remove Headdit
// @namespace   http://userscripts.org/users/GodOfAtheism
// @description Headdit stops some mod tools from functioning. This script adds a css rule which hides it.
// @include     *.reddit.com/*
// @version     1.4
// ==/UserScript==
//1.1 changes www.reddit.com/* to *.reddit.com/*
//1.2 changes the visibility from hidden to none.
//1.3 changes visibility to display
//1.4 makes what should be the last change, setting it to #headdit-box instead of a more limited element.

GM_addStyle("#headdit-box { display: none }");