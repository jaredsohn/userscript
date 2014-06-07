// ==UserScript==
// @name           Twitter Links Open In Same Tab
// @namespace      http://caseyconnor.org
// @description    make links in tweets open in same window
// @include        http://twitter.com/*/statuses/*
// @include        http://twitter.com/*/status/*
// @include        https://twitter.com/*/statuses/*
// @include        https://twitter.com/*/status/*
// ==/UserScript==

var as = document.getElementsByClassName('web');

for (var i = 0; i < as.length; i++)
{
  var a = as[i];
  a.target='';
}
