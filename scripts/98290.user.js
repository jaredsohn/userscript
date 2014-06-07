// ==UserScript==
// @name           Shorten definr.com URL
// @namespace      maeki.org
// @description    shorten URLs from www.definr.com to definr.com
// @include        http://www.definr.com/*
// ==/UserScript==

document.location.href = document.location.href.replace('www\.', '');