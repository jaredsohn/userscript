// ==UserScript==
// @name        Youtube Logo Link URL Change
// @namespace   krisu
// @description Changes the Youtube's logo link URL from frontpage to "My subscriptions, uploads only"-page
// @include     http*://youtube.com*
// @include     http*://www.youtube.com*
// @version     1
// ==/UserScript==

var ytLogo = document.getElementById('logo-container');
ytLogo.href = 'http://www.youtube.com/feed/subscriptions/u';