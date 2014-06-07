// ==UserScript==
// @name           diggSponsors
// @namespace      http://happyfunball.tv/diggFilter
// @description    removes sponsored ads
// @include        http://digg.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

jQuery(function(){
    jQuery("div.sponsored").remove();
    //alert(jQuery("p.sponsored-label").length);
    jQuery("p.sponsored-label").closest("div").remove();
});