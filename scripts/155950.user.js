// ==UserScript==
// @name          mf no title
// @namespace     mf
// @description   my first, remove titles
// @include        http://*.metafilter.com/
// @include        http://*.metafilter.com/daily.mefi/*
// @include        http://*.metafilter.com/index.cfm?*
// @include        http://*.metafilter.com/home/recentposts
// @grant					none
// ==/UserScript==

var titles = document.getElementsByClassName('posttitle')
  , titleSize = titles.length;
for(i=0;i<titleSize;++i) titles[i].style.display = "none"; 