// ==UserScript==
// @name           Wowhead Auto-Expand
// @namespace      whexpand
// @description    Automatically hides the ads and expands the page
// @include        http://*wowhead.com/*
// ==/UserScript==

document.body.setAttribute('onload','g_expandSite()');
