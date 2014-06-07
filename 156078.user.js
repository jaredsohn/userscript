// ==UserScript==
// @name        Dealabs direct links
// @namespace   quent57
// @description Remove undirect link in dealabs in some deals
// @include     http://www.dealabs.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

//// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
//this.$ = this.jQuery = jQuery.noConflict(true);
var $ = unsafeWindow.jQuery;

linkBalise = $(".voirledeal");
link=linkBalise.attr("href")

//console.info("link:"+link);
link = link.replace(/.*\?p=(.*)$/, "$1");

link = decodeURIComponent(link);
//console.info("link2:"+link);
linkBalise.attr("href",link);

