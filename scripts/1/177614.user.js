// ==UserScript==
// @name        Fix Micro-T Forum Links
// @namespace   https://sites.google.com/site/kenscode/
// @description Removes /forum/ from links on the Micro-T Forum.
// @include     http://www.microtforum.com/*
// @version     1
// @grant       none
// ==/UserScript==
var links = document.getElementsByTagName('A');
for(var i=0; i < links.length; i++) {
  var spos = links[i].href.indexOf('/forum/');
  if(spos == 0 || (spos >= 0 && links[i].href.indexOf('www.microtforum.com') >= 0)) {
    links[i].href = links[i].href.substring(0,spos+1) + links[i].href.substring(spos+7);
  }
}
