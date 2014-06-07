// ==UserScript==
// @name           Neopets Crawler
// @description    Randomly surfs Neopets.com
// @include        http://www.neopets.com/*
// ==/UserScript==

var minTime = 50; // lower bounds for random time
var maxTime = 5; // upper bounds for random time

var reloadTime = ((maxTime - minTime) * Math.random() + minTime) * 1000;

window.setTimeout(function(){window.location = 'http://neopets.com/random.phtml';},reloadTime);