// ==UserScript==
// @name          Say Hello!
// @namespace     http://youngpup.net/userscripts
// @description	  Greets the world
// @include       http://google.com/*
// @include       http://www.google.com/*
// @include       http://maps.google.tld/*
// @exclude       http://gmail.google.com/*

// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

alert("Hello, world!")
;alert("Hello, world!");