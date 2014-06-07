// ==UserScript==
// @name          Personal Settings For Miscellaneous Websites
// @namespace     http://userscripts.org/users/333623
// @description   Hides, alters, changes, adds various elements to commonly visited websites.
// @include       http*://*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version       1.0.2
// ==/UserScript==

$("span[id=popupslider]").remove();

$("span[class=block_wrap]").remove();
