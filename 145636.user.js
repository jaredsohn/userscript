// ==UserScript==
// @name        TSR Customised Layout
// @author      Vulpes
// @namespace   http://userscripts.org/users/vulpes
// @description This extension consists of a number of changes to the new TSR layout (2nd October 2012).
// @include     http://www.thestudentroom.co.uk/
// @include     http://*.thestudentroom.co.uk/
// @include     http://www.thestudentroom.co.uk/*
// @include     http://thestudentroom.co.uk/*
// @version     3.3
// ==/UserScript==

function with_jquery(e){var t=document.createElement("script");t.type="text/javascript";t.textContent="("+e.toString()+")(jQuery)";document.body.appendChild(t)}with_jquery(function(e){e(".page-section").width("90%");e("#carousel-container").width("960px");e("#page-section-top").width("90%");e(".page-section wide-gutter").width("90%");e("#page-section-top").css({padding:"8px 0px"});e("#page-section-top").width("90%");e("#takeover-panelright").hide();e("#takeover-panelleft").hide();e("#ad_sponsored_placeholder").css({display:"none"});e(".widget-subtitle").css({"background-color":"#f6f6f6"});e(".widget-content thead th").css({"background-color":"#f6f6f6"});e(".rep-info .details").css({color:"#808080"});e(".widget-list li").css({padding:"10px 5px"});e(".widget-list ul.expand li").css({padding:"2px 0px"});e(".thread.sticky.unread").css({"background-color":"#FFF2E4"});e(".thread.sticky.unread a").css({color:"#E17815"});e(".quote_block").css({"background-color":"#FAFEFF"});e(".postbody").css({"font-size":"12px"});e(".post-header").css({"background-color":"#e8f2f8"});e(".post-header .username").css({"font-size":"1.333em"});e(".post-header .item_top").css({"line-height":"1.5em"});e(".postusernamerollmenu").css({"margin-top":"2px"});e(".forum-icon").css({background:"none"});e(".forum-icon").css({width:"0px"});e(".forum-icon").css({padding:"0px"});e(".thread-icons-v2-old_quote").css({"background-size":"1116px 25px"});e(".thread-icons-v2-multiquote_off").css({"background-size":"1116px 25px"});e(".thread-icons-v2-multiquote_on").css({"background-size":"1116px 25px"});e(".thread-icons-v2-old_edit").css({"background-size":"1116px 25px"});e(".thread-icons-v2-old_post").css({"background-size":"1116px 25px"});e(".thread-icons-v2-rep-icon-neg").css({opacity:"0.8"})})