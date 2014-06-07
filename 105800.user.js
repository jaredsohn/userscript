// ==UserScript==
// @id             wowwikitowowpedia
// @name           WoWWiki to WoWPedia redirector
// @namespace      http://itsbth.com/
// @description    EWIST
// @include        http://www.wowwiki.com/*
// ==/UserScript==

window.location = window.location.toString().replace(/^http:\/\/(www\.)?wowwiki.com\//, 'http://www.wowpedia.org/');