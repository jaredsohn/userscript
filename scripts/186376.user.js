// ==UserScript==
// @name        cryptsy.com fix graph change
// @description Fixes graph change when you click on [Price/Volume] or [Depth]
// @namespace   asd
// @include     https://www.cryptsy.com/markets/view/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function (){
    $(".panel-heading").find("a").each(function() {
        $(this).attr("onclick",$(this).attr("href").replace("javascript:","") + "return false;");
    });
});