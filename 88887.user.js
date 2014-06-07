// ==UserScript==
// @name           Unbreak egenix website
// @namespace      http://njj.za.net
// @description    Remove the frame-like effect on content.
// @include        http://www.egenix.com/*
// ==/UserScript==
GM_addStyle("#egenix-page {width: 100%}")
GM_addStyle("#egenix-page-box {width: 95% !important}")
GM_addStyle("#egenix-page-box-body {width: 95%}")
GM_addStyle("#egenix-content {overflow: visible}")
var content_div = document.getElementById("egenix-content")
content_div.removeAttribute("style")
content_div.style.height="auto"
