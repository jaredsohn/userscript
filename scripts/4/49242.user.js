// ==UserScript==
// @name          FBSecure
// @description   force FB to use secure connection
// @include       http://www.facebook.com/*
// ==/UserScript==

location.href = location.href.replace(/^http:/, 'https:');