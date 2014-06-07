// ==UserScript==
// @name          Force HTTPS when Browsing Usenet Sites
// @description   Forces HTTPS Browsing these common Usenet Sites.
// @include       http://www.isohunt.com/*
// @include       http://isohunt.com/*
// @include       http://www.newzbin.com/*
// @include       http://newzbin.com/*
// @include       http://docs.newzbin.com/*
// @include       http://www.nzbmatrix.com/*
// @include       http://nzbmatrix.com/*
// @include       http://www.thepiratebay.org/*
// @include       http://thepiratebay.org/*
// @include       http://nzbs.org/*
// @include       http://www.nzbs.org/*
// @include       http://nzbsrus.com/*
// @include       http://www.nzbsrus.com/*
// @include       http://nzb.su/*
// @include       http://www.nzb.su/*
// ==/UserScript==

var url = window.location.href;

if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}