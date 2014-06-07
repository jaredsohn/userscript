// ==UserScript==
// @name        Weibo Big Picture
// @namespace   http://yujiande.appspot.com
// @description Open a new window for the big picture when the "show-big" link is mid-clicked.
// @include     *://weibo.com/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
window.addEventListener("load", function() {
    setInterval(function(){
        $('a.show_big').attr("href", function(i, v) {
            var action_data = $(this).attr("action-data");
            var pid = action_data.replace(/.*\bpid=(\w+).*/, "$1");
            var href = "//ww3.sinaimg.cn/large/" + pid;
            return href;
        });
    }, 1000);
}, false);
