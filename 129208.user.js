// ==UserScript==
// @name           Late Night Coffee
// @namespace      http://userscripts.org/users/17379
// @description    Set of alterations/improvements/optimizations for the Kanji Review site.
// @include        http://kanji.koohii.com/study/kanji/*
// ==/UserScript==

var $;

// Add jQuery
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

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        $('#sharedstories-new').hide();
        var kanjiElement = $('#my-story .kanji');
        kanjiElement.wrap('<a target="_blank" href="http://jisho.org/kanji/details/'+kanjiElement.text()+'">');
        kanjiElement.parent().css({'text-decoration':'none', 'color':'black'});
        /*
        var kanji = kanjiElement.text();
        kanjiElement.wrap('<a href="http://jisho.org/kanji/details/' + kanji + '>');
        */
    }