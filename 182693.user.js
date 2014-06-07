// ==UserScript==
// @name        PimpGoogleBookmarks
// @namespace   https://www.google.com/bookmarks
// @description Pimp Google Bookmarks
// @include     https://www.google.com/bookmarks/*
// @version     1
// @grant       none
// ==/UserScript==

var search_text = "";

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js';
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
            LetsJQuery();
        }
    }
    
// Wait for essential page elemnts being available
    function search_again() {
       var s = search_text.replace(/\s\(\d*\)/,"");
       $("input#gbqfq").val(s);
       $("button#gbqfb").trigger("click");    
    }
    
    function LetsJQuery() {
        $(document).ready(function() {
		  $("div#search").css("height",$( window ).height()-200);	
		  $("div#search").css("overflow","scroll");            
		  $("div.kd-content-sidebar").css("height",$( window ).height()-200);	
		  $("div.kd-content-sidebar").css("overflow","scroll");
          $("a").dblclick(function(event) {            
            search_text = $("input#gbqfq").val() + " label:" + $(event.target).text();
            window.setTimeout(search_again, 500);
          });
        });        
    }