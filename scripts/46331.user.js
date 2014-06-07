// ==UserScript==
// @name          Redirect mimima
// @description  auto redirect www*.mimima.com/ to www1.mimima.com
// @author        hallelujah
// @include       http://www2.mimima.com/*
// @include       http://www3.mimima.com/*
// @include       http://www4.mimima.com/*
// @include       http://www5.mimima.com/*
// @include       http://www6.mimima.com/*
// @include       http://www7.mimima.com/*
// @include       http://www8.mimima.com/*
// @include       http://www9.mimima.com/*
// ==/UserScript==
location.href=location.href.replace(/^http:\/\/www[2-9].mimima.com\//,"http://www1.mimima.com/");