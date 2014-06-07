// ==UserScript==
// @name           YouTube link to subscriptions page. 
// @namespace      youtube.com
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// @description    Edit Youtube logo link to your subscriptions. made by Crallebab
// @version        1.0
// ==/UserScript==

var logo=document.getElementById("logo-container");
logo.setAttribute("href", "http://www.youtube.com/feed/subscriptions/u");