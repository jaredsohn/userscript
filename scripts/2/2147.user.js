// ==UserScript==
// @name          Yahoo! Mail: Skip session expired page. 
// @description	  Skips Yahoo! Mail session expired page and go directly to the login page (https) instead
// @include       *mail.yahoo*
// ==/UserScript==

    try {
        var msg = document.getElementsByTagName("h2")[0].childNodes[0].nodeValue;

        if (msg.indexOf("Your login session has expired.") >= 0) {
            window.location="https://login.yahoo.com/config/login?.src=ym";
       }
   } catch (ex) {
   }


   
