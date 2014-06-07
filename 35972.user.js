// ==UserScript==
// @name           Secure connections on sites
// @namespace      http://www.Tenfold.co.nr
// @description    Forces known sites to use a secure connection
// @include        http://*paypal.com/*
// @include        http://www.google.com/accounts/ServiceLogin?service=mail*
// @include        http://addons.mozilla.org/*
// @include        http://*isohunt.com/*
// @include        http://*evernote.com/*
// @include        http://*binsearch.info/*
// @include        http://*binsearch.net/*
// @include       http://mail.google.com/*
// @include       http://www.google.com/calendar/*
// @include       http://docs.google.com/*
// @include       http://spreadsheets.google.com/*
// @include       http://www.google.com/reader/*
// @include       http://www.google.com/bookmarks/*
// @include       http://www.google.com/history/*
// @include       http://groups.google.com/*
// @include       http://sites.google.com/*
// @include       http://*.amazon.com/*
// @include       http://amazon.com/*
// @include       http://facebook.com/*
// @include       http://www.opendns.com/*
// @include       http://eztv.it/*
// @include       http://www.last.fm/* 
// @include       http://orkut.com/* 
// @include       http://www.orkut.co.in/* 
// ==/UserScript==

// Add other sites to the include list for secure connections too

if(location.href.indexOf('http://') !== -1)
{
location.href = location.href.replace(/^http:/, 'https:');
}