// ==UserScript==
// @name           No Trending Topics
// @namespace      http://www.fireandrobot.com/
// @description    Removes the trending topics section on the Twitter.
// @include        http://twitter.com/
// ==/UserScript==

var trending = document.getElementById('trends');
if (trending) {
    trending.parentNode.removeChild(trending);
}