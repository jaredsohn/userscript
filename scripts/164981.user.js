// ==UserScript==
// @name       Compact NGA
// @namespace  http://gordianyuan.com
// @version    0.1
// @description  Compact NGA
// @match      http://bbs.ngacn.cc/*
// @copyright  2013+, Gordian Yuan
// @require        http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.9.0.min.js
// ==/UserScript==

// Remove the top navigation
$("#_178NavAll_110906_765453").remove();

// Remove the top background
$("#custombg").remove();
$("#mainmenu").css({
    "margin": "10px",
    "height": "auto"
});
$("#mainmenu").prepend("<a class='start'>");
$("#mainmenu .avatar").remove();

// Remove the ad links 
$("#mainmenu>a[title^=魔兽世界]").remove();
$("#mainmenu>a.sep:last").remove();

// Remove the top right ad
$("#mc>a").remove();

// Hide 
$("#m_threads .forumbox:first").hide();

// 
$(".forumbox .postrow .c2 .postcontent").css({
    "max-width": "650px",
    "display": "block"
});

// Remove the signature
$("div[id^=postsign]").remove();

// Small avator
$("div[id^=postportrait]>img").css("max-height", "80px");
