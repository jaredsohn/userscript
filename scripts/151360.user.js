// ==UserScript==
// @name          Google Reader Auto Https
// @namespace     
// @description   google reader auto https
// @include       http://www.google.com/reader/*
// @exclude        
// ==/UserScript==

window.location.href = window.location.href.replace(/^http:/, 'https');
