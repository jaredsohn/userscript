// ==UserScript==
// @name        Reload GitHub Pull Request Diff page to ignore whitespace
// @namespace   https://communispace.com/greasemonkeyscripts
// @description Reloads the GitHub Pull Request Diff page, adjusting the URL to have the diffs ignore whitespace.
// @include     https://github.com/*/pull/*/files
// @include     https://github.com/*/commit/*
// @exclude     https://github.com/*/pull/*/files?w=1
// @exclude     https://github.com/*/commit/*?w=1
// @grant       none
// @version     1.1
// ==/UserScript==

// Wipe out the head and body contents so that we don't wait for them to load before doing the redirect.
document.head.innerHTML='';
document.body.innerHTML='';

// Redirect to the URL we are at, with the special modifier attached that signals to ignore whitespace in the diffs.

var whitespaceFreeUrl;
if(window.location.search)
	whitespaceFreeUrl = window.location.origin + window.location.pathname + window.location.search + "&w=1" + window.location.hash
else 
	whitespaceFreeUrl = window.location.origin + window.location.pathname + "?w=1" + window.location.hash

window.location.href = whitespaceFreeUrl;
