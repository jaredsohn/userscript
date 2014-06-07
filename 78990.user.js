// ==UserScript==
// @name          PWInsider Fix
// @description   PWInsider NoAds
// @author        myjunk1
// @version       3
// @include       http://*.pwinsider.com/*
// @include       http://*.pwinsiderxtra.com/*
// ==/UserScript==
var url = window.location.href;
var queryList = url.split('?');
var spligagain = queryList[1].split('&');
var newurl = ("http://www.pwinsider.com/ajax/commands/getarthtml.php?" + splitagain[0] + "&pn=1")';
window.location.href = newurl;