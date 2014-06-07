// ==UserScript==
// @name           Twitter Pagination
// @namespace      http://userscripts.org/users/67390/
// @include        http://twitter.com/*
// ==/UserScript==

if (!document.getElementById ||  !document.cloneNode || !document.appendChild) return;

var bottomNav = document.getElementById('pagination');
var topNav = bottomNav.parentNode.cloneNode(true);
var topNavInner = topNav.getElementsByTagName('div')[0];

var timeline = document.getElementById('timeline');
var container = timeline.parentNode;

if (container && timeline && topNav) container.insertBefore(topNav, timeline);