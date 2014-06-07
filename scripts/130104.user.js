// ==UserScript==
// @name           Fetlife, restore long header
// @namespace      http://example.com
// @include        https://fetlife.com/*
// ==/UserScript==

function rm(node) { node.parentNode.removeChild(node) }

rm(document.querySelector('header a[href="/explore"]').parentNode)

GM_addStyle(' #header_v2 ul.sections li.shorter { display:none } #header_v2 ul.sections li.longer { display:inline }')