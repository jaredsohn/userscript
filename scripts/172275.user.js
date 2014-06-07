// ==UserScript== 
// @name Bypass uppit adds
// @include http://*uppit.com/*
// @exclude http://*uppit.com/
// @exclude http://uppit.com/static/*
// @exclude http://uppit.com/favicon.ico
// @exclude http://uppit.com/*.html
// @exclude http://uppit.com/check-files
// @exclude http://uppit.com/static/banner.gif
// @exclude http://*uppit.com/?*
// @grant none
// @run-at document-start
// ==/UserScript== 
var url=window.location.pathname;
var url1="http://dlgen.heliohost.org/uppit"+url;
window.location.replace(url1.replace("http://uppit.com/",""));