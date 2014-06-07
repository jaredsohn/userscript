// ==UserScript==
// @name          AddLiveBookmark
// @namespace     http://www.mozilla.com
// @description   Add Live Bookmrak even on XML file
// @license       http://creativecommons.org/licenses/by-sa/2.5
// @include       *.xml
// @include       *.rss
// ==/UserScript==


document.write('<html><head><title>Roox</title>');
document.write('<link rel="alternate" type="application/rss+xml" title="RSS" href="');
document.write(window.location);
document.write('">');
document.write('</head><body>AddLiveBook</body></html>');
