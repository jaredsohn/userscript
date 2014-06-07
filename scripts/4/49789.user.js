// ==UserScript==
// @name Youtube add &fmt=6
// @description I've quickly just modified Joe Simmon's abandoned &fmt=18 "watch Youtube videos in high quality" script down to &fmt=6 in an attempt to fix that damn video flickering bug with Flash 9 whilst not upping the quality.
// @author Danny Hynes
// @include        http://*youtube.com/watch?v=*
// ==/UserScript==

var theurl = window.content.location.href.toString();

if (theurl.search("fmt=6") == -1) {
  window.content.location.href = (theurl + "&fmt=6");
}