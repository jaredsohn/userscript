// ==UserScript==
// @name       Facebook Video Prank
// @namespace  http://shit.is.gold/
// @version    0.1
// @description  something fucking useful
// @match      http*://*.facebook.com/*
// @copyright  2012 by me
// ==/UserScript==
(function(){

function redirect_links()
{
    videolink = "http://www.youtube.com/watch?v=X2F4EFYM_MA";
    embeddedlink = "http://www.youtube.com/v/X2F4EFYM_MA?version=3&autohide=1&autoplay=1&rel=0&showinfo=0&showsearch=0"
    if (document.getElementsByName("attachment[params][metaTagMap][16][value]")[0].value == "@youtube") {
        document.getElementsByName("attachment[params][og_info][guesses][0][1]")[0].value = videolink;
        document.getElementsByName("attachment[params][og_info][properties][0][1]")[0].value = videolink;
        document.getElementsByName("attachment[params][url]")[0].value = videolink;
        document.getElementsByName("attachment[params][urlInfo][user]")[0].value = videolink;
        document.getElementsByName("attachment[params][urlInfo][final]")[0].value = videolink;
        document.getElementsByName("attachment[params][urlInfo][canonical]")[0].value = videolink;
        document.getElementsByName("attachment[params][metaTagMap][17][value]")[0].value = videolink;
        
        document.getElementsByName("attachment[params][video][0][src]")[0].value = embeddedlink;
        document.getElementsByName("attachment[params][metaTagMap][9][content]")[0].value = embeddedlink;
        document.getElementsByName("attachment[params][metaTagMap][16][value]")[0].value = "@youpoop";
    }
}

document.addEventListener('DOMNodeInserted', redirect_links, false);
})();
