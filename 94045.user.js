// ==UserScript==
// @name           Youtube un-Ad-er
// @namespace      http://happyfunball.tv/youTubeFilter
// @include        http://www.youtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//$("span:contains('Promoted')").closest("li").remove();
$(".watch-pyv-vid").remove();
$(".watch-ppv-vid").remove();

jQuery("#watch-related").bind("DOMSubtreeModified", function() {
    //$("span:contains('Promoted')").closest("li").remove();
    $(".watch-pyv-vid").remove();
    $(".watch-ppv-vid").remove();
});
