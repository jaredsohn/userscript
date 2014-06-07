// ==UserScript==
// @name          Gmail Notes Client
// @namespace     http://www.gmailnotes.com
// @description   Browser interface for Gmail Notes server (gmailnotes.appspot.com)
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// @version       4.1.0
// @homepage      http://www.gmailnotes.com
// @copyright     2009, john Tourtellott
// ==/UserScript==



//
// ======================================
// THIS SCRIPT IS NOW OBSOLETE
// GO TO http://gmailnotes.appspot.com
// ======================================
//

if (window.top == window.self)  {
   var message = "";
   message += "You have an *old* version of Gmail Notes installed that no longer works.";
   message += "\n" + "Please uninstall it and go to http://gmailnotes.appspot.com for the new version.";
   message += "\n" + "If you need help, contact support@gmailnotes.com";
   alert(message);
}
