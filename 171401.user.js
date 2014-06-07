// ==UserScript==
// @name       Newgrounds Background Link Disabler
// @version    v1.0
// @description  Disables the link in the back of most Newgrounds pages.  Helpful if you constantly click away from the page and don't want to watch where you click to click back.
// @include    http://www.newgrounds.com/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
$("div.skinad-l, div.skinad-r").html(null);