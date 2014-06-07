// ==UserScript==
// @name            Fix_nulled
// @namespace    http://userscripts.org
// @description     Убираем правый блок
// @include          http://nulled.ws/*
// @include          http://www.nulled.ws/*
// @author          alica
// ==/UserScript==

var $;

(function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ      = document.createElement('script');
                GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js';
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
        $('#main > tbody > tr:nth-child(4) > td:nth-child(2) > table#content_s > tbody >  tr > td:nth-child(4)').hide();
}