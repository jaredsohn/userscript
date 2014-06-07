// ==UserScript==
// @name        Magnatune Member
// @namespace   http://ssvx.de/
// @description Jump to download.magnatune.com when accessing magnatune.com because the newsletter only takes you to the public area.
// @include     http://magnatune.com/*
// @version     1
// @grant       none
// ==/UserScript==
if (document.location.href.indexOf('http://magnatune.com') != -1) document.location.href = document.location.href.replace('http://magnatune.com', 'http://download.magnatune.com');