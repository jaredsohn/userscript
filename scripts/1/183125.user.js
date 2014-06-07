// ==UserScript==
// @name           Watchseries.lt autowatch
// @description    Automatically clicks "click to watch"
// @author         Alorel
// @include        http://watchseries.lt/open/cale/*
// @require        http://code.jquery.com/jquery-2.0.3.min.js
// @version        1.0
// ==/UserScript==

location.href=$("a.myButton").attr("href");