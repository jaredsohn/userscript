// ==UserScript==
// @name        Hide 'Who to follow'
// @namespace   http://wearegeek.nl
// @description Hides the 'Who to follow'-block on Twitter
// @include     http://twitter.com
// @include     http://twitter.com/*
// @include     https://twitter.com
// @include     https://twitter.com/*
// @version     0.1
// ==/UserScript==

var whoToFollow = document.getElementsByClassName("wtf-module");

for (var i = 0; i < whoToFollow.length; i++) {
    whoToFollow[i].style.display = 'none';
}

