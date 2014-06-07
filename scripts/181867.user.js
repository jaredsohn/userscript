// ==UserScript==
// @name           Reddit Open in New Tabs
// @namespace      Reddit New Tabs
// @include        http://www.reddit.com/*
// @version        1.0.1
// @author         MrTimcakes or Ducky
// @description    Opens all reddit links in new tabs.
// @updateURL      https://userscripts.org/scripts/source/181867.meta.js
// @downloadURL    https://userscripts.org/scripts/source/181867.user.js
// ==/UserScript==

var linkList = document.getElementsByTagName('a');

for(var i in linkList){
 linkList[i].setAttribute('target', '_blank');
}