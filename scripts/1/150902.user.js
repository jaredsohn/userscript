// ==UserScript==
// @name           myDLM
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description    search,junk,cashback,pricecomparison,merchant,comments
// @include        http://www.hotukdeals.com/*
// @version        1
// ==/UserScript==


//------ ALL PAGES




var new_btn = $('<button id="btn">Like page</button>');          // new button
var new_span = $('<span>START</span>').addClass('spn');      // new <span> with class="spn"
var moreLinks       = $(".like-comment");
var evenMoreLinks       = $(".action-like");

    
// Identfy if deal/misc page
if ($(".tags").length)  {   
  new_btn.insertAfter('.tags');        // insert the new button after the tag with id="idd"
  
    }
if ($("#comments-per-page").length)  {   
  new_btn.insertAfter('#comments-per-page');        // insert the new button after the tag with id="idd"
  
    }



  $('#btn').click(function() {
 
      moreLinks.each ( function () {
        var clickEvent  = document.createEvent ("HTMLEvents");
        clickEvent.initEvent ("click", true, true);
        this.dispatchEvent (clickEvent);
      
  });
      
          evenMoreLinks.each ( function () {
        var clickEvent  = document.createEvent ("HTMLEvents");
        clickEvent.initEvent ("click", true, true);
        this.dispatchEvent (clickEvent);
      
  });
      
      
      
      
});
