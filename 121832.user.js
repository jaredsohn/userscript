// ==UserScript==
// @name          Reddit Battlefield 3 Clickable Flare
// @namespace     http://www.reddit.com/bf3/clickable_flare
// @description   Updates flare tags so that they can be clicked to link to the origin website
// @include       http://www.reddit.com/r/battlefield3/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version       0.2
// @icon          http://thumbs.reddit.com/t5_2rlua.png?v=ae4283b31534668cbac758f04d8abfd0
// ==/UserScript==

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { initialized(unsafeWindow.jQuery); });
  }
  
  GM_wait();

  function initialized($) {
    $('span.flair').live('click', function(event){
        var originURL = "http://battlelog.battlefield.com/bf3/user/",
            originURLDelimiter = "/",
            windowName = "_blank";
    
        originURL = originURL + $(this).text() + originURLDelimiter;
        GM_openInTab( originURL );
        
        event.preventDefault();
        event.stopPropagation();
    });
  }
})();