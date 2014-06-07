// ==UserScript==
// @name           Get Rid Of Facebook Sidebar
// @namespace      GROFS_CK
// @description    by Carl Kuang
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle(".sidebarMode #pageHead,.sidebarMode #globalContainer {left:0;}");
GM_addStyle("#pagelet_sidebar {display:none;}");