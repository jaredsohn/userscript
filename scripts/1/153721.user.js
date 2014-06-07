// ==UserScript==
// @name          Correct the Youtube homepage
// @namespace     http://theandyroid.com
// @description   Change Youtube logo to redirect to subscriptions feed
// @include       http*://www.youtube.com/*
// ==/UserScript==

hompageLogo = document.getElementById("logo-container")
//get the element for the youtube logo
hompageLogo.setAttribute('href','/feed/subscriptions/u')
//change the link to subscriptions uploads only
//if you want all activity change '/feed/subscriptions/u' to '/feed/subscriptions'


