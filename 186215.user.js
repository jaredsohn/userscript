// ==UserScript==
// @name        Breaking News
// @namespace   twitter.com/helenensikat
// @description Redirects Google News to default search by date.
// @include     http://www.google.com/*
// @include     http://www.google.com.au/*
// @include     https://www.google.com/*
// @include     https://www.google.com.au/*
// @version     1
// @grant       none
// @copyright   CC BY-SA 2.0
// ==/UserScript==


(function() {

var url = window.location.href;
var GNModfier = /tbm=nws/;
var SBDateModifier = /&tbs=sbd:1/;

if (GNModfier.test(url)
    && !SBDateModifier.test(url)) 
    window.location.href = url + "&tbs=sbd:1";

})();
