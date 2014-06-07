// ==UserScript==
// @name           Richard's redirect to mobile twitter
// @namespace      twitter
// @description    Redirects from regular twitter to the mobile site
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// ==/UserScript==

var newurl = window.location.href.replace(/^https?:\/\/(www\.)?twitter.com/, 'https://mobile.twitter.com');
// replace hash-bang fragments with proper url sections
// e.g. http://twitter.com/#!/richq => https://mobile.twitter.com/richq
newurl = newurl.replace(/#!\/(.*)/, '$1');
window.location.href = newurl;
