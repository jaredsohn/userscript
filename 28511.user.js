// ==UserScript==
// @name           Youtube music/hide video
// @namespace      http://youtube.com/
// @description    Hide the video from YouTube's player
// @include        http://*.youtube.com/watch?v=*
// ==/UserScript==

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
            letsJQuery();
        }
    }

    function letsJQuery() {
        $(document).ready(function(){
            $('#movie_player').attr('style','height:37px !important');
            $('#watch-player').attr('style','height:37px !important');
            $('#watch-sidebar').attr('style','margin-top:-37px');
        });
    }
