// ==UserScript==
// @name			Always use HTTPS for any website
// @description			This extension WILL NOT make every website you visit https. It will only work on sites that you physically add, e.g. like the URL for Google Cache that has been added. See description for more info. 
// @include			http://webcache.googleusercontent.com/*
// ==/UserScript==
window.location.href = window.location.href.replace(/^http:/, 'https:');