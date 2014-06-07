// ==UserScript==
// @name           Google Webcache Browsing
// @namespace      random_webcache
// @description    Fixes all links in Google's WebCache so that they continue to point to WebCache-d URLs instead of the original [possibly inaccessible] URLs.
// @grant          none
// @include        http://webcache.googleusercontent.com/search*
// @include        https://webcache.googleusercontent.com/search*
// ==/UserScript==

var links = document.getElementsByTagName('A');
for (var i=4, link; link = links[i++];) { // first 3 links in WebCache's "frame"
  if (link.href)
    link.href = "http://webcache.googleusercontent.com/search?strip=1&q=cache:" + link.href;
}
