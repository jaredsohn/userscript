// ==UserScript==
// @name           break.com filter
// @namespace      http://happyfunball.tv/breakFilter
// @description    resizes the stingy tiny image, removes junk
// @include        http://www.break.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


jQuery(function(){
    jQuery("#imageResize").width(800);
    jQuery("#imageResize").closest("div").css("width", "800");
    
    jQuery(".right_iframe").hide();
    jQuery(".content_rgt_wrap").hide();
    jQuery("#new_diggstumble_wrap").closest("div").hide();
    jQuery("#footer").hide();
});