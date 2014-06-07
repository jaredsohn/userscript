// ==UserScript==
// @name          Inbox Zero Badge
// @namespace     http://www.codetocustomer.com
// @description   Get a pretty reminder when you get to Inbox 0
// @include       http*://mail.google.com/*
// @include       http*://gmail.google.com/*
// @include       http*://*.mail.google.com/*
// @include       http*://*.gmail.google.com/*
// ==/UserScript==

(function() {
  
  BADGE_HTML = '<a href="http://www.nerdmeritbadges.com/products/inbox-zero" target="_blank"><img src="http://s3.tikaro.net.s3.amazonaws.com/inbox_zero_medium.png" alt="Inbox Zero, Congrats!" style="border: 0;"/></a>';

  setInterval(checkForInboxZero, 100);

  function checkForInboxZero() {
  
    var html = document.getElementsByTagName("html")[0];
    
    if (html.className == "cQ") {  // only bother if we're in the canvas iframe

      var rows = document.getElementsByClassName("MZZu1b", "td");
      
      for (var i = 0; i < rows.length; i++) {
    
        // find the notification row
        if (rows[i].colSpan == 3 && rows[i].style.textAlign == "center"  // check for the styles first, figured it would be faster
             && rows[i].className.indexOf("badged") == -1                // check we haven't already badged it
             && rows[i].innerHTML.indexOf("No new mail!") != -1         // make sure we're on the inbox page (can't check location.has, we're in an iframe)
           ) {
    
          rows[i].innerHTML = BADGE_HTML;
          rows[i].className = rows[i].className + " badged";
      
        }
    
      }
    
    }

  }


}());