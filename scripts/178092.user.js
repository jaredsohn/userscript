// ==UserScript==
// @name        Relink Twitter
// @namespace   ReplaceConnectLinkonTwitter
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @grant       none
// @version     1.1
// ==/UserScript==
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    if (links[i]=='https://twitter.com/mentions'){
        links[i].href = 'https://twitter.com/i/connect';
    }
    if (links[i]=='http://twitter.com/mentions'){
        links[i].href = 'http://twitter.com/i/connect';
    }
}

/* try again with another method, 'cause sometimes the above selection fails */

var links = document.getElementsByClassName('js-nav');
for (var i = 0; i < links.length; i++) {
    if (links[i]=='https://twitter.com/mentions'){
        links[i].href = 'https://twitter.com/i/connect';
    }
    if (links[i]=='http://twitter.com/mentions'){
        links[i].href = 'http://twitter.com/i/connect';
    }
}
