// ==UserScript==
// @name           Hide Twitter Counts
// @namespace      http://twitter.com/1samadams
// @description    Silence the Intrawebz (aka suppress twitter follower\ing counts)
// @include        http://twitter.com*
// @include        http://www.twitter.com*
// @include        https://twitter.com*
// @include        https://www.twitter.com*
// ==/UserScript==

var folc = document.getElementById('follower_count')
var foll = document.getElementById('follower_count_link')
var uflc = document.getElementById('following_count')
var ufll = document.getElementById('following_count_link')

if (folc) {
  folc.innerHTML=' ';
}

if (foll) {
  foll.innerHTML=' ';
}

if (uflc) {
  uflc.innerHTML=' ';
}

if (ufll) {
  ufll.innerHTML=' ';
}
