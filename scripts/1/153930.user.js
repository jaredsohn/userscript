// ==UserScript==
// @name        Youtube one-click uploads only
// @namespace   sE3r3TnamaspacaC 
// @description Makes it possible to go the the subscriptions uploads only page with one click, with the button "My subscriptions"
// @include     https://www.youtube.com/
// @include     https://www.youtube.com/*
// @version     1
// ==/UserScript==

document.querySelector("[data-channel-id='subscriptions']").setAttribute("href","/feed/subscriptions/u")