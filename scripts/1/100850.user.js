// ==UserScript==
// @name Spergs flash on
// @description This script changes the url of sper.gs video pages to include flash on so people can stop bitching
// @author briben69
// @include       sper.gs/watch.php?id=*
// ==/UserScript==

var theurl = window.content.location.href.toString();

if (theurl.search("&flash=on") == -1) {
  window.content.location.href = (theurl + "&flash=on");
}