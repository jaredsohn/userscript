// ==UserScript==
// @name        YT Link
// @namespace   DigitalDeath
// @description YouTube Logo verlinkt zu Abos
// @include     http*://youtube.com*
// @include     http*://www.youtube.com*
// @version     1.1
// ==/UserScript==

var youtubelogo = document.getElementById('logo-container');
youtubelogo.href = 'http://www.youtube.com/feed/subscriptions/';