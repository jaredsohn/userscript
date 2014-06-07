// ==UserScript==
// @name        MTurk resize iframe and setfocus
// @namespace   na
// @include     http://www.mturk.com/mturk/*
// @version     1
// @grant       none
// ==/UserScript==


var a = document.getElementsByTagName("IFRAME");
for (var i=0, len=a.length; i<len; i++) {
  a[i].height="1200"; 
    a[i].focus();
    }

