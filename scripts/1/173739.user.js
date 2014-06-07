// ==UserScript==
// @name        Unlock Yahoo Search Bar
// @namespace   http://borg.org
// @description Unlocks the annoying Yahoo Search Bar and allows it to be scrolled.
// @include     *.yahoo.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant       metadata
// @version     1
// ==/UserScript==

if(!$("#yucsHead")){
    return;
}

document.documentElement.setAttribute('style', 'padding-top: 0 !important');
$("#yucsHead").before($("#yucsHead").children());
$("#yucsHead").remove();

// Fix for Yahoo News.  Not perfect though.
$(".yog-hd").removeClass("yog-hd");
// Removes lock from "Recommended for You" bar on right
$(".title-bar").removeClass("title-bar");