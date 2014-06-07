// --------------------------------------------------------------------
//
// This is a Greasemonkey user script http://greasemonkey.mozdev.org/
// author: Winston Huang
// 2006-03-20
// 
// ==UserScript==
// @name          Yahoo! Mail: Skip virus scan result page when viewing attachment (of course only when there is no virus)
// @description	  Yahoo! Mail: Skip virus scan result page when viewing attachment (of course only when there is no virus). The download attachment dialog will start immediately without needing to click on the "Download Attachment" button. 
// @include       *mail.yahoo*ShowLetter*VScan=1*
// ==/UserScript==

if (document.body.innerHTML.indexOf("No virus threat detected") > 0) {
    window.location.href = window.location.href + "&download=1"; 
}

