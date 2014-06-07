// ==UserScript==
// @name            Hack Forums Thread rating on own threads
// @namespace       Snorlax
// @description     Shows thread rating on your own threads
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/showthread.php?tid=*
// @version         1.0
// ==/UserScript==

uid = $("#panel").find('a').attr('href').replace(/[^0-9]/g, '');
str = $(".largetext > a:first").attr("href").replace(/[^0-9]/g, '');
title = $(".current_rating").text();
if(str == uid && $('a:contains("#1"):first').text() == "#1"){
    $("a[class*='star']").attr("title",title).css("cursor","default");
    $(".star_rating.star_rating_notrated").attr("class","star_rating");
}