// ==UserScript==
// @name           No Twitter Recommended User Section
// @namespace      http://dkris.com/
// @description    Remove Twitter Recommended User Section
// @include        http://twitter.com/*
// ==/UserScript==

var l=document.getElementById('recommended_users');
l.style.display = 'none';