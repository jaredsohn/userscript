// ==UserScript==
// @name           Mosaic favicon
// @namespace      http://prototype.thmvmnt.com/
// @description    Rotate through the search's resulting favicons
// @author   THE MOVEMENT http://prototype.thmvmnt.com/
// @include        http://www.google.com/search*
// ==/UserScript==
// Add jQuery

    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
    var favicons=[]
    var currentfavicon=0;
// All your GM code must be inside this function
    function letsJQuery() {
        
        $(".j .a").each(function(){
          favicons.push("http://"+$(this).text().split("/")[0]+"/favicon.ico")
        })
        $("link[type=image/x-icon]").remove();
        unsafeWindow.console.log($("head").html())
        setInterval(function(){
          currentfavicon++
          if(currentfavicon>=favicons.length) currentfavicon=0;
          //$("link[type=image/x-icon]").attr("href",favicons[currentfavicon])
          $("head").append('<link type="image/x-icon" rel="shortcut icon" href="'+favicons[currentfavicon]+'" />')
        },1000)
    }

