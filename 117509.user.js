// ==UserScript==
// @name          hide-top-bar-for-google-reader+
// @namespace     http://aau.cn
// @description	  hide-top-bar-for-google-reader。
// @author        xj199241
// @homepage      https://www.google.com/*
// @include       https://*.google.com/*
// @homepage      http://www.google.com/*
// @include       http://*.google.com/*
// @run-at        document-start
// ==/UserScript==
document.getElementById("top-bar").style.display = "none";
