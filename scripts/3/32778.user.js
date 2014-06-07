// ==UserScript==
// @name           LJ adv
// @namespace   http://cd19.wordpress.com
// @include         http://*.livejournal.com/*
// ==/UserScript==

function getElementByClass(className) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      return all[e];
}

function nextObject(o) {
  var n = o;
  do
    n = n.nextSibling;
  while (n && n.nodeType != 1);
  return n;
}

function removeAdsByClass(className) {
  while (ads = getElementByClass(className)) {
    ads.parentNode.removeChild(ads);
  }
}

removeAdsByClass("adv");
removeAdsByClass("h-adv-box");
removeAdsByClass("ljadwrapper-journal-after-post-c");

var hrs = document.getElementsByTagName("hr");
for (var e = 0; e < hrs.length; e++) {
  var n = nextObject(hrs[e]);
  if (n && n.nodeName.toLowerCase() == "hr") {
    hrs[e].parentNode.removeChild(n);
  }
}
