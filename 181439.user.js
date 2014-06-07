// ==UserScript==
// @name       Plex title attribute on title
// @namespace  http://koentsas.no-ip.org:32400/*
// @version    0.1
// @description  Adds a title attribute to the plex title. When the title is to long to be displayed an information box will show on hover
// @match      http://koentsas.no-ip.org:32400/*
// @copyright  2012+, Koen T'Sas
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

var updateTitles = function(){
    $(".poster-title").each(function(){
        $(this).attr("title", $(this).text());
    });
    
    setTimeout(updateTitles, 1000);
};

updateTitles();