// ==UserScript==
// @name        Youtube link
// @namespace   Bassintag
// @include     *://www.youtube.com/
// @include     *://www.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==

elem = document.getElementById("logo-container");
elem["href"] = "/feed/subscriptions";