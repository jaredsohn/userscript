// ==UserScript==
// @name           Tumblr Reblog Yourself
// @namespace      http://userscripts.org/users/435728
// @description    Enables the ability to reblog yourself.
// @icon           http://media.tumblr.com/tumblr_lzcmomuMQD1r3tapg.png
// @include        http://www.tumblr.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        1.0
// ==/UserScript==

var opt = $("#channel_id").find("option:eq(0)");
if(opt.val() != "0") {
    opt.attr("value", "0").text("my blog");
​}​​