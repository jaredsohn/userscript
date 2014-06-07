// ==UserScript==
// @name           /r/formula1 flare remover
// @namespace      dchest
// @description    Remove flairs from /r/formula1 subreddit.
// @include        http://www.reddit.com/r/formula1/*
// ==/UserScript==

var flairs = document.getElementsByClassName('flair');
for (var i = 0; i < flairs.length; i++) {
    flairs[i].style.display = 'none';
}
