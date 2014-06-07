// ==UserScript==
// @name           DZone sidebar tabs closer to the top of the page
// @namespace      http://userscripts.org/users/jikote
// @description    Moves the DZone.com sidebar tabs (top links, rising links and tag cloud) closer to the top of the page
// @include        http://dzone.com/*
// @include        http://www.dzone.com/*
// ==/UserScript==
var sidebarTabs = document.getElementById('sidebarTabs');
sidebarTabs.style.top = '100px';
sidebarTabs.style.bottom = '';

