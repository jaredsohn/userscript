// ==UserScript==
// @name          remove-linkedin-pulse
// @namespace     http://vrde.wordpress.com/
// @description   This script removes Linkedin Pulse news update on homepage.
// @include       https://www.linkedin.com/*
// @include       http://linkedin.com/*
// @include       https://*.linkedin.com/*
// @include       http://*.linkedin.com/*
// @version       0.1
// ==/UserScript==

GM_addStyle("#today-news-wrapper { display: none !important; }");