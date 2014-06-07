// ==UserScript==
// @name           fjords redirector
// @namespace      
// @include        http://g.e-hentai.org/g/*
// @include        http://g.e-hentai.org/s/*
// ==/UserScript==
var url1 = 'http://exhentai.org';
var url2 = location.pathname.split('/g\/\w.*');

if(document.title == "Gallery Not Available - E-Hentai Galleries") {
   location.href = url1 + url2;
}