// ==UserScript==
// @name          Time Sink Throttle
// @namespace     http://ironfroggy.net/userscripts
// @description	  50/50 change of not loading a page on domains you spend too much time!
// @include       http://reddit.com/
// @include       http://www.reddit.com/
// @include       http://reddit.com/r/*
// @include       http://www.reddit.com/t/*
// ==/UserScript==

if (Math.random() > 0.5) {
    document.body.style.display = 'none';
}