// ==UserScript==
// @name        No I won't add or reject those friend requests, fuck off zuck! 
// @namespace   fake.net
// @include     https://facebook.com/*
// @include     http://facebook.com/*
// @description See title
// @version     2013
// @grant       none
// ==/UserScript==

x=document.getElementById('requestsCountValue').innerText;if(x="14"){document.getElementById('requestsCountWrapper').setAttribute('style','display:none;')}