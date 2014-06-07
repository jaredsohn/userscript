// ==UserScript==
// @name		Reddit Imgur Mirror
// @description		Routes imgur links through filmot.com
// @namespace		http://www.reddit.com/user/neotek
// @include		http://reddit.com/*
// @include		http://*.reddit.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$('a[href*="i.imgur.com"]').filter(function(){
  return $(this).attr('href');
}).each(function(){
  $(this).attr('href', $(this).attr('href').replace(/i.imgur.com\/(.*)/i, 'i.filmot.com/$1'));
});

$('a[href*="imgur.com"]').filter(function(){
  return $(this).attr('href');
}).each(function(){
  $(this).attr('href', $(this).attr('href').replace(/imgur.com\/(.*)/i, 'i.filmot.com/$1.jpg'));
});