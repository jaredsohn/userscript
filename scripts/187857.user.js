// ==UserScript==
// @name        Facebook Number Game Hider - By Raven D.
// @namespace   http://facebook.com
// @description Will automatically hide number game posts on facebook
// @include		http*://*.facebook.com/*
// @version     9
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       unsafeWindow
// ==/UserScript==

function hideNumberGame (jNode) {
    $(".showerhiddden").click(function() {
        $(this).parent().prev().show();
        $(this).parent().hide();
    });
    
    $(".userContentWrapper").filter(function(index){
        var patt= new RegExp("([#]+\\s*\\W*[0-9]+)|(\\bno[\\.]+\\s*[0-9]+)","i");
        return patt.test($(this).text()) && !$(this).hasClass("numhide");
    }).addClass("numhide").hide().after(function(index){
        var from = $(this).find('h5 a').text();
        if (!$(this).next().hasClass("is-hidden")){
            return "<div class=is-hidden style='background:#405D9B;color:white'> Post hidden from " + from + " .. <button type=button class=showerhiddden style=background:white;float:right;>Show</button></div>";
        }
    });
    
}

waitForKeyElements (".userContentWrapper", hideNumberGame);



