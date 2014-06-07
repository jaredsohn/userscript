// ==UserScript==

// @name           Fluff Friends Forum Title Cleanser
// @namespace      http://userscripts.org/users/62808
// @description    Modify forum message title to display just the title, not the stuff before it!
// @include        http://fluff-friends.com/*
// @include        http://www.fluff-friends.com/*
// ==/UserScript==

document.title = document.title.replace(/^\(fluff\)Forum \:\: /, '');
document.title = document.title.replace(/^View topic - /, '');
document.title = document.title.replace(/^View Forum - /, '');