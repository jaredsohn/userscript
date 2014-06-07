// ==UserScript==
// @name           Evernote Promotions Remover
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        2.0
// @description    Removes Promotions and container from Evernote.com. Gives more length to left side.
// @icon           http://www.gettyicons.com/free-icons/101/high-detail/png/32/evernote_32.png
// @icon64         http://www.gettyicons.com/free-icons/101/high-detail/png/64/evernote_64.png
// @include        http://*.evernote.com/*
// @include        https://*.evernote.com/*
// @author         FootRoot@UserScripts
// @copyright      Kawaikunee
// @copyright      http://kawaikunee.blogspot.com/2011/11/web-evernote.html

// ==/UserScript==
$(document).ready(function(){  
    var i=setInterval(function(){
        var el=$("[href*='/prom/']").parent().parent();
        if(el){
            el.prev().css('bottom','0px').prev().css('bottom','35px');
            el.remove();
            if(typeof el == "undefined" || el == "[]"){
                clearInterval(i);
            };
        };
    },1);
});