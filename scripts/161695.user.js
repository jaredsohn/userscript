// ==UserScript==
// @run-at document-start
// @id             Amazon URL Cleaner
// @name           Amazon URL Cleaner
// @namespace      
// @description    Clean Amazon item URL
// @include        http://www.amazon.tld*/dp/*
// @include        http://www.amazon.tld*/dp/*
// @version        1.1
// ==/UserScript==
var newurl = document.URL.match(/https?:\/\/(|www).amazon.(.+?)\//g) + document.URL.match(/dp\/[A-Z0-9]{10}/g);
if (newurl != document.URL) location.replace(newurl);