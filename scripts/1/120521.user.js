// ==UserScript==
// @name          Speed up tumblr browsing
// @namespace     http://github.com/johan/
// @description   Prerenders the next page on tumblr.com, and adds arrow key navigation between pages (left = previous page, right = next page). The pre-rendering probably only happens if you run Google Chrome and started it with a --prerender=enabled command line flag.
// @include       http://*.tumblr.com/*
// @match         http://*.tumblr.com/*
// ==/UserScript==

var prev
  , next
  , path = location.pathname
  , base = '/page/'
  , page = path.match('^/page/(\\d+)');

if (page) page = Number(page[1]);
else if ('/' === path) page = 1;

if (page) {
  if ((prev = linked(base + (page - 1)))) prev = prev.href;
  if ((next = linked(base + (page + 1)))) next = next.href;
  if (next) prerender(next);
  if (next || prev)
    document.addEventListener('keyup', function(e) {
      if (e.keyCode === 37 && prev) location.href = prev;
      if (e.keyCode === 39 && next) location.href = next;
    }, false);
}

function linked(url) {
  return document.querySelector('a[href="'+ url +'"]');
}

function prerender(url) {
  var pre = document.createElement('link');
  pre.rel = 'prerender';
  pre.href = url;
  return document.head.appendChild(pre);
}
