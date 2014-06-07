// ==UserScript==
// @name           Youtube Redirect
// @namespace      http://userscripts.org/scripts/show/55083
// @description    Redirects youtube.com to it's IP adress, so you can watch it even when its blocked.
// @include        http://www.youtube.com/*
// ==/UserScript==

newurl = window.location.href.replace(/www.youtube.com/, "208.117.236.69");
location.replace(newurl);