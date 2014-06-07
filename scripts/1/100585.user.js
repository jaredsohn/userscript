// ==UserScript==
// @name           tabby links
// @namespace      http://userscripts.org/users/71401
// @description    Makes all links open in tabs
// @include        http://www.metafilter.com/*
// @include	   http://ask.metafilter.com/*
// ==/UserScript==

for (var i=0; link=document.links[i++];) 
  link.setAttribute('target','_blank');