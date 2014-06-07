// ==UserScript==
// @name           Time greeting
// @namespace      ...
// @include        http://google.com*
// @include        http://www.google.com*
// ==/UserScript==
var d=new Date();
var time=d.getHours()

if (time<12)
  {
  alert('Good Morning!')
  }
else
  {
  alert('Good Afternoon!')
  }