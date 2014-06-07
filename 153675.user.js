// ==UserScript==
// @name           YouTube link + Center
// @namespace      youtube.com
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// @description    Edit Youtube logo link to your subscriptions + center the site! made by Crallebab
// @version        1.6
// ==/UserScript==

var logo=document.getElementById("logo-container");
logo.setAttribute("href", "http://www.youtube.com/feed/subscriptions/u");

document.body.classList.remove("site-left-aligned");

if (location.pathname == ("/results")) {
	document.getElementById("page") ? document.getElementById("page").style.width = "1003px" : "";
}

if (document.getElementById("masthead-subnav")) {
	document.getElementById("masthead-subnav").setAttribute("style", "margin:0 auto !important");
	document.getElementById("guide-container") ? document.getElementById("guide-container").style.top = "40px" : "";
}