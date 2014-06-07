// ==UserScript==
// @name           grovesharkSkin
// @namespace      grove
// @description    groveshark restyling skin minimal
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @include        http://grooveshark.com/*
// ==/UserScript==


var foto="http://img823.imageshack.us/img823/6812/penguinsk.jpg"   // 454 464




$(window).load(function() {
$("<style type='text/css'>#page.gs_page_home{background-image:url("+foto+")} #page_header_navigation .inPageSearchBar{float:left; width:250px;}  #searchBar{background-color:#000000;} .page_header_link, #theme_home, #theme_groovesharkHomepage_logo, #theme_groovesharkHomepage_background, .page_controls, #stagetext_communityFeed, #communityFeed_hideShow, #theme_groovesharkHomepage_about, #theme_groovesharkHomepage_twitter, #gs_home_like, #header h1, #homeFooter, #theme_groovesharkHomepage_userFeed, #page_content_profile, #header_explore_btn,  #header_music_btn, #header_community_btn, #header_userOptions{ display: none;width:0px; height:0px;}</style>").appendTo("head");

var elementi=$('.page_header_link, #theme_home, #theme_groovesharkHomepage_logo, #theme_groovesharkHomepage_background, .page_controls, #stagetext_communityFeed, #communityFeed_hideShow, #theme_groovesharkHomepage_about, #theme_groovesharkHomepage_twitter, #gs_home_like, #header h1 ,#homeFooter, #theme_groovesharkHomepage_userFeed, #page_content_profile, #header_explore_btn,  #header_music_btn, #header_community_btn, #header_userOptions')
elementi.hide();elementi.height(0);elementi.width(0)



});
