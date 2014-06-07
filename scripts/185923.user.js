// ==UserScript==
// @name        Favicon for Confluence
// @namespace   http://kaizenplatform.in
// @include     https://*.atlassian.net/wiki/*
// @description Add a confluence favicon in Atlassian OnDemand
// @version     1.1
// ==/UserScript==

var favicons = document.head.querySelectorAll('link[rel~=icon]');

for (var i = 0; i < favicons.length; i++) {
  favicons[i].href = 'https://confluence.atlassian.com/favicon.ico';
}