// ==UserScript==
// @name        jandan pic filter
// @namespace   autoMangaNextPage
// @description auto shrink unwelcome images
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include     http://*.jandan.net/*
// @include     http://jandan.net/*
// ==/UserScript==

// revision from http://www.oschina.net/code/snippet_781015_23659
isBadImgLi = function(li){
    var oo = parseInt(li.find("span[id^='cos_support']").html());
    var xx = parseInt(li.find("span[id^='cos_unsupport']").html());
    return xx>30 && xx/oo>1.5 && (oo<100 || xx/oo>3);
};

hideImgs = function(liSelector){
    $("li").each(function(){
        var li = $(this);
        if(liSelector(li)){
            li.find("img").animate({height:10});
        }
    });
};

hideImgs(isBadImgLi);
