// ==UserScript==
// @name        DirectApktop
// @namespace   DirectApktop
// @description Apk auto downloader
// @include     http://www.papktop.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @version     1
// @grant       metadata
// ==/UserScript==

var clickEvent = document.createEvent ('MouseEvents');
var downloadLink = document.querySelector ("a[href*='.apk']");

clickEvent.initEvent ('click', true, true);
downloadLink.dispatchEvent (clickEvent);