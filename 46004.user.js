// ==UserScript==
// @name Plurk Bookmarks
// @namespace http://plurk.com/
// @description Bookmark Plurks using delicious.com
// @include *
// @exclude http://plurk.com/browse/*
// @exclude http://plurk.com/Settings/*
// ==/UserScript==

alert('GM Test 1');

// Load jQuery
var GM_JQ  = document.createElement('script');
GM_JQ.src  = 'http://jquery.com/src/jquery-latest.js';
GM-JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

alert('Am i here?');

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GW_wait(), 100);
    } else {
        $ = unsafeWindow.jQuery;
        begin();
    }
}
GM_wait();

function begin() {
    alert('bok');
    $('.text_holder').live('click', function() {
        alert('kliknuo si na plurk');
    });
}
