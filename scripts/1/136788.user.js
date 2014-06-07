// ==UserScript==
// @name       Twitter HTTPS links
// @namespace  https://www.twitter.com
// @version    0.1
// @description  replace http links witth https
// @match      https:*/twitter.com/*
// @copyright  2012+, Edd
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(function(){
    
    setInterval(httpsIt, 3000);
    
});

function httpsIt() {
    $(".twitter-timeline-link").each(function(){
        var oldUrl = $(this).attr("href");
        $(this).attr("href", oldUrl.replace("http://", "https://"));
    });
}