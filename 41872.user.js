// ==UserScript==
// @name           google meet delicious
// @namespace      http://www.blendedtechnologies.com
// @description    Search your delicious bookmarks when you search the google
// @include        http://www.google.*/search?*q=*
// @include        http://www.google.*/*
// ==/UserScript==

var d_user = 'gregory31415';
var base_d_url = 'http://delicious.com/search?context=userposts&lc=1&';

//Load jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; insert_del_search(); }
}
GM_wait();

// All your GM code must be inside this function
function insert_del_search() {
    //alert($); // check if the dollar (jquery) function works

    //Make escaped search query
    var query = $('input[name="q"]').eq(0).val();
    var d_url = base_d_url + $.param({'u':d_user,'p':query});

    //Place iframe in google page
    var iframe = $('<iframe width="100%" height="320" />');
    iframe.attr('src',d_url);

    var title_bar = $('#ssb');
    title_bar.after(iframe);
}