// ==UserScript==
// @name				 news.yc open in new tab
// @namespace		 http://joshwand.com/
// @description	 opens links on news.yc's list pages in new tabs/windows
// @include			 http://news.ycombinator.com/
// @include			 http://news.ycombinator.com/news
// @include			 http://news.ycombinator.com/newest
// @include			 http://news.ycombinator.com/x?*

// ==/UserScript==

var a, links, thisdomain;
thisdomain = window.location.host;

links = document.links;
for (var i = 0; i < links.length; i++) {
  a = links[i];
  if (a.host) {
    if (a.host != thisdomain || String(a).match(/item\?id=/)) {
      a.target = "_blank";
    }
  }
}

