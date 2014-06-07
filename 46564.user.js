//  Copyright (c) 2009, Ahmadism
//
//  Revision History:
//  0.0.1     April 12, 2009 - initial beta version.
//  Mozilla Greasemonkey Script
//
// @include       http://jobsearch.monster.com/*
// @include       http://*.indeed.com/*
// @include       http://*.dice.com/*
// ==UserScript==
// @name           Launch in New Tab (LiNT)
// @namespace      http://www.ahmadism.com/
// @description    Launches, all included sites, in a new window/tab.  A simple but very useful script especially for job boards.
// ==/UserScript==
(function(){
  var x,i;
  x=document.links;
  for(i=0;i<x.length;++i) {
    x[i].target="_blank";
  }
}
)();