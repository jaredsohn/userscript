// ==UserScript==
// @name           DailyFlix V1.5
// @version        Feb 6, 2012
// @namespace      http://DailyFlix.net
// @description    Enables direct streaming of videos from multiple file hosts.
// @include        http://*
// @include        https://*
// ==/UserScript==

var s = document.createElement('script');
s.setAttribute("type","text/javascript");
s.setAttribute("src", "http://www.dailyflix.net/gmscript/dailydivx.js");
document.getElementsByTagName("head")[0].appendChild(s);