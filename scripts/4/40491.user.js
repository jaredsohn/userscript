// ==UserScript==
// @name YouTube Add &fmt=18/22 to url
// @description Watch high quality videos
// @author Goodsoft
// @include        http://*youtube.com/watch?v=*
// ==/UserScript==

var theurl = window.content.location.href.toString();

if (theurl.search("fmt=18") == -1 && theurl.search("fmt=22") == -1) {
  window.content.location.href = (theurl + "&fmt=18");
}