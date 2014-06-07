// ==UserScript==
// @name           SecureSocial
// @namespace      SecureSocial
// @include        http://twitter.com/*
// @include        http://facebook.com/*
// @include        http://www.twitter.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==

var oldURL = window.location.hostname + window.location.pathname;
var newURL = "https://" + oldURL;
window.location = newURL;

