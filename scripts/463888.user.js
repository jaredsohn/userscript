// ==UserScript==
// @name       Remove Google Redirection
// @version    0.0.4
// @match      http://www.google.com/*
// @match      https://www.google.com/*
// @match      http://www.google.com.tld/*
// @match      https://www.google.com.tld/*
// @match      http://www.google.co.tld/*
// @match      https://www.google.co.tld/*
// ==/UserScript==

Object.defineProperty(unsafeWindow, "rwt", {
	value: function() {},
	writable: false
});