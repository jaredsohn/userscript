// ==UserScript==
// @name           GMail SingleQuote
// @namespace      google
// @description    Removes all but the newest quotes from the answer field
// @include        *://mail.google.com/mail/*
// ==/UserScript==

var quotes_to_keep = 1;

if ( document.getElementsByClassName('gmail_quote').length > 0 )
{
  var q = document.getElementsByClassName('gmail_quote')[quotes_to_keep*2];
  if (q) q.parentNode.removeChild(q);
}
