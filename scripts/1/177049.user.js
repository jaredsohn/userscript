// ==UserScript==
// @name       Hide Facebook "Trending" Panel 
// @namespace  http://www.2dot3.com/
// @version    0.1
// @description  Removes Facebook's "Trending" right-hand panel. Will break if Facebook changes ID.
// @match      https://www.facebook.com/
// ==/UserScript==

var trending = document.getElementById('pagelet_trending_tags_and_topics');
trending.style.display = 'none';
