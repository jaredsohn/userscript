// ==UserScript==
// @name           NY Times Paywall
// @description    Removes the NY Times pay wall.
// @include        http*://nytimes.com/*
// @include        http*://*.nytimes.com/*
// ==/UserScript==

// Code taken from http://news.ycombinator.com/item?id=2355757
// Prototype is already installed on NYTimes pages, so I'll use that:
$('overlay').hide();
$('gatewayCreative').hide();
$(document.body).setStyle( { overflow:'scroll' } );
