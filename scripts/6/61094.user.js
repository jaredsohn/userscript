// ==UserScript==
// @name           NoMonolingualism
// @namespace      http://whym.github.com
// @description    Remove assignments of 'lang="en"' to HTMLs, in order to let browsers/OSs choose better fonts for non-English contents.
// @include        http://*.tumblr.com/*
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://*.twitter.com/*
// @include        https://*.twitter.com/*
// @include        http://www.bing.com/*
// @include        http://*.jottit.com/*
// @include        http://hootsuite.com/*
// @include        http://www.ustream.tv/twitterjs/*
// @include        http://meta.wikimedia.org/*
// @include        http://favstar.fm/*
// @include        https://beta.gist.com/*
// @include        http://twitpic.com/*
// @include        https://twitpic.com/*
// @version        0.0.2
// ==/UserScript==

(function() {
	 document.documentElement.removeAttribute('xml:lang');
	 document.documentElement.removeAttribute('lang');
})();
