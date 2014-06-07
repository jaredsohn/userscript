// ==UserScript==
// @name          Outlook BrowserSupport Fix
// @description   Redirect to Outlook Mail page
// @run-at        document-start
// @include       https://dub125.mail.live.com/mail/BrowserSupport.aspx*
// @version       1.0
// ==/UserScript==


if(top.location.href="https://dub122.mail.live.com"){

 window.location="https://dub122.mail.live.com";
    
}