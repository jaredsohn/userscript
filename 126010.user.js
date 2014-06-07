// ==UserScript==
// @name		TwitXKCD
// @description		Userscript to tweet XKCD comics
// @include		http://xkcd.com/*
// ==/UserScript==

var tweetbutton = document.createElement('a');
tweetbutton.href = 'https://twitter.com/share';
tweetbutton.class = 'twitter-share-button';
tweetbutton.appendChild(document.createTextNode('Tweet'));
var transcript = document.getElementById('transcript');
transcript.parentNode.insertBefore(tweetbutton, transcript);