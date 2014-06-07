// ==UserScript==
// @name           switch to secure connection
// @namespace      my userscripts
// @include        http://*.kasserver.com/*,http://kasserver.com/*,http://csb.vu/*,http://www.csb.vu/*
// ==/UserScript==

window.location.href = window.location.href.replace(/^http:/, 'https:');