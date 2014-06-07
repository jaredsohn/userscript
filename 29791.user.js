// ==UserScript==
// @name           imdb akas
// @namespace      imdb
// @description    always forwards you to akas.imdb.com
// @include        http://www.imdb.com/*
// @exclude        http*://akas.imdb.com/*
// ==/UserScript==



// rewrite url
if (location.href == 'http://www.imdb.com/')
  location.href = location.href.replace('http://www.imdb.com/', 'http://akas.imdb.com/');
