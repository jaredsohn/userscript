// ==UserScript==
// @name        Redirect m.youtube.com
// @namespace   maeki.org
// @description Redirect m.youtube.com to youtube.com
// @include     http://m.youtube.com/*
// @grant       none
// @version     1
// ==/UserScript==

document.location.href = document.location.href.replace('m.', '');