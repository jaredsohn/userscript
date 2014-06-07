// ==UserScript==
// @name           Hide Israel/Palestine Tweets
// @namespace      http://yahelc.com
// @description    Hides tweets that mention Israel or Palestine.
// @include        http://*twitter.com*
// @include        http://*search.twitter.com*

// ==/UserScript==

javascript:(function() {  var script = document.createElement("script");script.src = "http://www.htmlto.com/israel-palestine-filter.js"; document.body.appendChild( script );})()