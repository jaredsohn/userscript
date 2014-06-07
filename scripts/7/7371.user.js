// ==UserScript==
// @name           Yahoo Mail Fix
// @namespace      http://mywebsite.com/myscripts
// @description    Fix non-displaying Yahoo mail
// @include        http://*.mail.yahoo.com/*
// ==/UserScript==

var msg = document.getElementById("message");
msg.style.visibility = "visible";
msg.style.overflow = "hidden"; 
