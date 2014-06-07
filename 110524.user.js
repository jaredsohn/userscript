// ==UserScript==
// @name           BigotBlocker
// @namespace      http://www.schalkburger.za.net/code/turn-off-comments-sa-news-websites
// @description    Turn off comments on popular South African news sites. Based on the BigotBlocker extension for Chrome.
// @include        http://www.news24.com/*
// @include        http://*.news24.com/*
// @include        http://www.timeslive.co.za/*
// @include        http://*.timeslive.co.za/*
// @include        http://www.iol.co.za/*
// @include        http://*.iol.co.za/*
// @include	   http://www.dieburger.com/*
// @include	   http://*.dieburger.com/*
// @include	   http://www.beeld.com/*
// @include	   http://*.beeld.com/*
// @version        1.5
// ==/UserScript==

function removeEach(ar){
    for(var i=0; i<ar.length;i++)
    ar[i].parentNode.removeChild(ar[i]);
}
removeEach(document.querySelectorAll("#comments_wrap, .comments, .reader_comments, .comm_writter_name_cont, .comm_coment_box, .pagination_container, #disqus_thread"));