// ==UserScript==
// @name        YouTube Homepage Changer
// @description Changes YouTube's logo link to the subscriptions view,
// @namespace   *
// @include     http://www.youtube.com/*
// @version     1
// ==/UserScript==

document.getElementById("logo-container").href = '/feed/subscriptions';