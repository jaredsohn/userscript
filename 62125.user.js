// ==UserScript==
// @name           Reddit nextprev at top
// @namespace      com.reddit.userscripts
// @description    Reddit nextprev at top
// @include        http://www.reddit.com/*
// ==/UserScript==

unsafeWindow.addEventListener('load', function()
{
    unsafeWindow.$('p.nextprev').clone().insertBefore('#siteTable');
}, false);
