// ==UserScript==
// @name          Facebook Secure
// @namespace     http://diveintogreasemonkey.org/download/
// @description   force facebook to use secure connection
// @include       http://*facebook.com/*
// ==/UserScript==

window.location.href = window.location.href.replace(/^http:/, 'https:');