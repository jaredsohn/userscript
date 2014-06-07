// ==UserScript==
// @name        No GIF links
// @namespace   http://twitter.com/mhitza
// @description Removes links that end as GIFs
// @include     https://www.reddit.com
// @include     http://www.reddit.com
// @include     https://www.reddit.com/r/*
// @include     https://www.reddit.com/r/*
// @version     1
// @grant       none
// ==/UserScript==

$('a.title')
  .filter(function(i,v) { return /\.gif$/.test($(v).attr('href')); })
  .each(function(i,v) { $(v).parent().parent().remove() });
