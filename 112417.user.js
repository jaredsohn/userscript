// ==UserScript==
// @name Inline Thumbnail Default Setting
// @namespace inline_thumbnail_default
// @description Expand to view thumbnails in the row.
// @updateURL https://userscripts.org/scripts/source/112417.meta.js
// @run-at document-end
// @include http://hootsuite.com/*
// @include https://hootsuite.com/*
// @include http://twitter.com/*
// @include https://twitter.com/*
// @include https://mobile.twitter.com/*
// @include http://www.crowy.net/*
// @include http://twipple.jp/*
// @include https://tweetdeck.twitter.com/*
// @version 1.4.1
// ==/UserScript==

(function() {

var head = document.getElementsByTagName('head')[0];

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '//thumbnailurlconv.appspot.com/js/inline_thumbnail.js';
head.appendChild(script);

})();
