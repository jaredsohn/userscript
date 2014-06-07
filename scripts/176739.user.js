// ==UserScript==
// @name           FileGamesGB-BYPASS
// @namespace      Max789
// @description    Bypass file.gamesgb.com link protection
// @include        http://file.gamesgb.com/*
// @version        0.2
// ==/UserScript==
(function(){
    var content = $('[name="description"]').attr("content").toString();
    var link = content.substr(0,content.indexOf(" "));
    location.href = link;  
}());//End Self-Invoking Function