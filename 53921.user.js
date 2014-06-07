// ==UserScript==
// @name           Remove Twitpic Ad
// @namespace      http://userscripts.org/scripts/show/53921
// @description    This removes the advertisement container on the Twitpic site
// @include        http://twitpic.com/*
// ==/UserScript==

document.getElementById('view-photo-ad').parentNode.removeChild(document.getElementById('view-photo-ad'));