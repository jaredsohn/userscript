// ==UserScript==
// @name           Instapaper links in new tab
// @namespace      http://twitter.com/hairyhatfield
// @description    Opens links you click in Instapaper in a new tab.
// @include        http://www.instapaper.com/*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {
  if (links[i].className.indexOf("tableViewCellTitleLink") >= 0) {
    links[i].setAttribute("target", "_blank");
  }
};