// ==UserScript==
// @name         Youtube first </li> (blank) removal at the top of video feed
// @namespace    http://userscripts.org/users/zackton
// @version      1.1.2
// @description  Youtube first list item removal
// @updateURL    http://userscripts.org/scripts/source/154903.meta.js
// @include      htt*://*.youtube.com/*
// @grant        none
// ==/UserScript==

var li = document.getElementById('feed-pyv-container');
li.parentNode.removeChild(li);