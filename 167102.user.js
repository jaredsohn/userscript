// ==UserScript==
// @name        simplecd.me，不再打开下载窗口，单击直接下载
// @namespace   slayercat.com
// @include     http://simplecd.me/entry/*
// @version     1
// @grant  none
// ==/UserScript==

$(".post2 a").each(function() {
    var mp = $(this);
    var hrefin = $(this).attr('href');
    
    $.get( hrefin, null, function(data,status) {
            var hrefreal = $(data).find("a").attr("href");
            if(hrefreal.startsWith("ed2k://"))
            {
                 mp.attr('href',hrefreal);
            }
        });
    
    //h.attr("onclick","slayercat_mm_open(h)");
});