// ==UserScript==
// @name           Hide Twitter Follower Count
// @namespace      mogrify
// @description    Don't want to see your follower count? Don't.
// @include        http://twitter.com/*
// ==/UserScript==

var span = document.getElementById('follower_count')

if (span) {
  span.innerHTML='&#8734;';
}