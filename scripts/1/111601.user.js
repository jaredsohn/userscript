// ==UserScript==
// @name           Hide Facebook Ticker from Chat Bar
// @namespace      Giles Wells (mediagearhead.com)
// @include        https://*.facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==

var s=document.getElementById('pagelet_ticker');
s.parentNode.removeChild(s);
var t=document.getElementsByClassName('fbChatSidebarBody');
t.removeAttribute('style');