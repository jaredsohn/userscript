// ==UserScript==
// @name        anti-namefag (theregister edition)
// @namespace   theregister
// @description Forum anonymizer for theregister.co.uk
// @include     http://forums.theregister.co.uk/*
// @include     http://forums.channelregister.co.uk/*
// @include     http://forums.reghardware.com/*
// @version     1
// @grant       none
// ==/UserScript==
var authors = document.getElementsByClassName('author');
var i = authors.length;
while (--i >= 0) {
    var author = authors[i];
    author.innerHTML = '';
}
var badges = document.getElementsByClassName('user_icons');
var i = badges.length;
while (--i >= 0) {
    var badge = badges[i];
    badge.innerHTML = '';
}
