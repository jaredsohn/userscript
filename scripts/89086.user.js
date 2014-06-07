// ==UserScript==
// @name          my.cl.ly thumbs
// @namespace     http://www.omgmog.net
// @description   Inserts a thumbnail next to each image upload on cloudapp  "my.cl.ly"
// @include       http://my.cl.ly/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==
$(function(){
    $("#uploads table tr").each(function(){ 
        if($(this).find("span.type").hasClass("image")){
        url = $(this).find("td.title a").attr("href"); 
        img = '<img src="" class="thumb" width="320px"/>'; 
        $(this).find("td.title").prepend(img); 
        $(this).find("img.thumb").attr("src",url+"/content"); 
        }
    });
});