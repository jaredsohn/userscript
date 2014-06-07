// ==UserScript==
// @name          Yahoo Secure
// @namespace     http://shii.org/tech
// @description   force Yahoo to use secure connection (basically the same as GMailSecure by Mark)
// @include       http://login.yahoo.com/*
// ==/UserScript==

window.location.href = window.location.href.replace(/^http:/, 'https:');
