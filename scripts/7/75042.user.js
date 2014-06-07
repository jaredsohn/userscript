// ==UserScript==
// @name           Twitter Lines
// @namespace      http://userscripts.org/users/113977
// @description    Restore line-breaks and multiple spaces in tweets by converting them to HTML breaks and non-breaking spaces
// @include        http://www.twitter.com/*
// @include        http://twitter.com/*
// @include        https://www.twitter.com/*
// @include        https://twitter.com/*
// @include        http://www.brizzly.com/*
// @include        http://brizzly.com/*
// @include        https://www.brizzly.com/*
// @include        https://brizzly.com/*
// @include        http://favstar.fm/*
// @version        0.3.2
// @date           2011-01-06
// @creator        Jeremy Cutler
// ==/UserScript==

var newS = document.createElement('style');
newS.setAttribute('type','text/css');
newS.innerHTML = '.entry-content, .tweet-text, .theTweet { white-space:pre-wrap !important; }';
document.getElementsByTagName('head')[0].appendChild(newS);