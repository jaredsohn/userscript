// ==UserScript==
// @name           Hacker News Search Link
// @namespace      am
// @description    Adds a link to google site search in the Hacker New header.
// @include        http://news.ycombinator.com/*
// ==/UserScript==
// version 0.3
// Created 2009-06-01
// Last Modified 2009-08-19
// author Aaron McBride (http://www.apejet.org/aaron/)
// license: public domain (attribution appreciated)
//
// Changes:
// 0.1 - basic implementation (2009-06-01)
// 0.2 - dropped jQuery (not really needed) (2009-06-03)
// 0.3 - switching to searchyc.com (2009-08-19)
//

var pagetops = document.getElementsByClassName('pagetop');
if(pagetops.length > 0) {
    var serachSite;
    //searchSite = 'http://www.google.com/search?q=site%3Anews.ycombinator.com';
    searchSite = 'http://searchyc.com/';
    pagetops[0].innerHTML += ' | <a id="sitesearch" href="' + searchSite + '">search</a>';
}