// ==UserScript==
// @name What day is it on CR?
// @namespace http://www.courtrivals.com/
// @description Replaces Court Rivals logo with day of season graphic
// @include http://www.courtrivals.com/*
// ==/UserScript==

var images = document.getElementsByTagName('img');
for (i in images) {
  if (images[i].parentNode.innerHTML.match('smalllogo')) {
  images[i].parentNode.innerHTML =
    '<img src="http://www.courtrivals.com/images/seasonHistogram.php" width="150" height="20" />';
  }
}
