// ==UserScript==
// @name         Fix Wikia External Links
// @description  Stop external links from popping up ads and waiting.
// @version      1.0
// @license      Public Domain
// @include      http://*.wikia.com/*
// @include      http://www.wowwiki.com/*
// ==/UserScript==

setTimeout(function() { unsafeWindow.$('a.external').unbind(); }, 0);
