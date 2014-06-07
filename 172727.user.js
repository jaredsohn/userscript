// ==UserScript==
// @name        -eBay blue popup
// @namespace   x
// @include     http://www.ebay.com.au/*
// @include     https://www.ebay.com.au/*
// @include     http://www.ebay.com/*
// @include     https://www.ebay.com/*
// @include     http://www.ebay.co.uk/*
// @include     https://www.ebay.co.uk/*
// @version     1
// ==/UserScript==
var elem = document.getElementById("vi_notification");
elem.parentNode.removeChild(elem);