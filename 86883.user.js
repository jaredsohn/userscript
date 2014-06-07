// ==UserScript==
// @name           Hide Mad Men Tweets
// @namespace      http://yahelc.com
// @description    Hides tweets that mention Mad Men.
// @include        http://*twitter.com*
// @include        http://*search.twitter.com*

// ==/UserScript==

javascript:(function() {  var script = document.createElement("script");script.src = "http://www.htmlto.com/madmen-filter.js"; document.body.appendChild( script );})()