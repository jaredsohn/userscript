// ==UserScript==
// @name           AutoRefresh
// @namespace      http://varunkumar-n.blogspot.com
// @description    AutoRefreshes the page every 2 mins
// @include        https://www.irctc.co.in/*
// @include        http://www.irctc.co.in/*
// @include        https://irctc.co.in/*
// @include        http://irctc.co.in/*
// ==/UserScript==

setTimeout("window.location.reload(true)", 2 * 60 * 1000);