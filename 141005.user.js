// ==UserScript==
// @name       Bloomberg! Don't Refresh Me Bro
// @namespace  http://www.bloomberg.com/
// @version    0.1
// @description  Stops the auto-refresh
// @match      http://www.bloomberg.com/*
// @copyright  None, Public Domain
// ==/UserScript==

window.setTimeout(function(){
    var $ = unsafeWindow.$ // inherit jquery
    $(".video_module .cassette").each(function(i,e){
        console.log("preventing auto refresh!");
        $(e).append('<li class="track playing" style="display:none;">Stop The Refresh</li>');
    });
}, 20000);
