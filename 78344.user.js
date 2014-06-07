// ==UserScript==
// @name           WideTweetArea
// @version        0.1
// @namespace      http://nicebo.at
// @description    Widens the Twitter "What's happening?" textbox so that you can make long, wide-character tweet with ease.
// @include        https://www.twitter.com/*
// @include        http://www.twitter.com/*
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

(function() {
    document.getElementById('status').rows = 4;
    document.getElementById('status').style.height = "4.5em";
})();
