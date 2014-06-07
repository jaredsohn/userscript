// ==UserScript==
// @name           Google Analytics Link Adder
// @namespace      Gergeosson
// @description    Adds a link to Google Analytics in the Google Bar under "more".
// @include        http://*.google.*/*
// @include        https://*.google.*/*

// ==/UserScript==

var ol = document.getElementById("gbd").getElementsByTagName('ol')[0];

ol.innerHTML = '<li class="gbmtc"><a onclick=gbar.qs(this) class="gbmt" href="https://www.google.com/analytics/settings/?et=reset&hl=sv">Analytics</a></li>' + ol.innerHTML;