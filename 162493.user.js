// ==UserScript==
// @name           Twitter: No Line Breaks in Tweets
// @namespace      com.gingerbeardman.twitternobreaks
// @description    Prevents display of line breaks in tweets on Twitter.com
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @match          http://twitter.com/*
// @match          https://twitter.com/*
// @run-at         document-end
// @author         Matt Sephton
// @version        1.0.0
// ==/UserScript==

document.body.className = document.body.className.replace(/ tweet-display-linebreaks/gi, '');
