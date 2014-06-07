// ==UserScript==
// @name YouTube Add &fmt=18 to url
// @description This script originally written and abandoned by Joe Simmons. Watch videos in high quality automatically instead of standard. Checks the URL on page load for &fmt=18 and when not found, adds it to the url and refreshes the page.
// @author Joe Simmons
// @include        http://*youtube.com/watch?v=*
// ==/UserScript==

var theurl = window.content.location.href.toString();

if (theurl.search("fmt=18") == -1) {
  window.content.location.href = (theurl + "&fmt=18");
}