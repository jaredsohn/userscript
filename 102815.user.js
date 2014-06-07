// ==UserScript==
// @name           gtfrc breadcrumbs
// @namespace      tanj
// @description    add the forum links to the bottom of the page
// @include        http://www.gtfrc.com/*
// ==/UserScript==
var breadcrumb = document.getElementById('breadcrumb');
var pagi_bot = document.getElementById('pagination_bottom');
var pagenav = document.getElementById('below_threadlist');

if(breadcrumb) {
  var crow = document.createElement('div');
  crow.innerHTML = breadcrumb.innerHTML;
  crow.className = 'breadcrumb';
  if(pagi_bot) {
    pagi_bot.parentNode.insertBefore(crow, pagi_bot.nexSibling);
  }else if (pagenav) {
    pagenav.insertBefore(crow, pagenav.nextChild);
  }

}