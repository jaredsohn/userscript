// ==UserScript==
// @name           Friendly SongMeanings
// @namespace      http://logankoester.com
// @description    Redirects lyrics pages on songmeanings.net to their printer friendly format.
// @include        http://www.songmeanings.net/lyric.php?lid=*
// ==/UserScript==

url = window.location.href;
if (url.search("&action=printerfriendly") == -1) {
  var target = url + "&action=printerfriendly";
  var target = target.replace("lid", "id"); // PHP programmers do silly things
  window.location.href = window.location.href = target;
}