// ==UserScript==
// @name           Craigslist tab order
// @description    Change the tab order of links on Craigslist pages so the first time you hit tab it goes to the first link
// @include        http://*.craigslist.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function() {
  var tabindex = 1;
  $('p > a:first-child').each(function() {
    $(this).attr('tabindex', tabindex);
    tabindex++;
  });
});