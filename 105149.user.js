// ==UserScript==
// @name           WATMM GoodListnr
// @namespace      watmm.goodlistnr
// @description    GoodListnr integration on WATMM boards
// @include        http://forum.watmm.com/*
// ==/UserScript==

// SETTINGS
var goodlistnr_url = "http://87.106.106.142/Room/watmm";
var goodlistnr_feed = "http://87.106.106.142/Feed/ActivityRss/FeedWatmm";
var update_interval = 10;

// BOILERPLATE
// console log
var GM_log;
if(unsafeWindow.console){
    GM_log = unsafeWindow.console.log;
}else{
    GM_log = function(){}
}
// jquery insertion crap
var $;
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        init();
    }
}

// CODE
function init() {
    var cache = 0;
    var update = true;
    // get value from cache
    if(GM_getValue('timestamp')){
        cache = GM_getValue('cache');
        // check for update
        if((new Date().getTime() - parseInt(GM_getValue('timestamp'))) < 1000 * 60 * update_interval){
            update = false;
        }
    }
    // show nav item
    var navitem = '<li id="nav_goodlistnr" class="left"><a title="Go To GoodListnr" href="'+goodlistnr_url+'" target="_blank">GoodListnr<span id="chat-tab-count"></span></a></li>';
    $('#primary_nav ul').append(navitem);
    // show count from cache
    if(cache > 0) $('#nav_goodlistnr a').append('<span id="chat-tab-count" class="ipsHasNotifications">'+cache+'</span>');
    // update roomcount if outdated
    if(update) getRoomCount();
}
function getRoomCount(){
    $.ajax({
        url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' + encodeURIComponent(goodlistnr_feed),
        dataType: 'json',
        success: function(data) {
            roomCountLoaded(data.responseData.feed);
        }
    });
}
function roomCountLoaded(feed){
    if(feed.entries && feed.entries.length > 0) val = parseInt(feed.entries[0].title);
    // setTimeout hacks because GM_SetValue doesn't work otherwise
    setTimeout(function(){ 
        GM_setValue('timestamp',new Date().getTime()+'');
        GM_setValue('cache',''+val);
    },0);
    // remove current count
    $('#nav_goodlistnr #chat-tab-count').remove();
    // show new count
    if(val > 0){
        $('#nav_goodlistnr a').append('<span id="chat-tab-count" class="ipsHasNotifications">'+val+'</span>');
    }
}
