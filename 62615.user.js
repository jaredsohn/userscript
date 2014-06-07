// ==UserScript==
// @name TraverseTab
// @description Force Brad Traverse job listings to open in a new tab. 
// @include http://www.bradtraverse.com/*
// @include http://*.bradtraverse.com/*
// 
// ==/UserScript==

for (var i = 0; i < document.getElementsByTagName('a').length; i++) 
{
  (document.getElementsByTagName('a'))[i].setAttribute("target", "_blank") ;
  self.blur() ;
}

self.blur() ;