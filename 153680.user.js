// ==UserScript==

// @name          YouTube v.4 Uploads Only

// @namespace     LKP_YTv4Up

// @description   When visiting YouTube, this script will redirect you to another page with only the uploads of your subscriptions.

// @include       http://www.youtube.com/*
// @include       https://www.youtube.com/*

// @run-at        document-start

// @version       0.9

// ==/UserScript==

var regexpattern = new RegExp("https?://www\.youtube\.com/?$", "i");

if (regexpattern.test(document.URL))
{
    window.location.href = "http://www.youtube.com/feed/subscriptions/u";
}