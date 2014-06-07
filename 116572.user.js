// ==UserScript==
// @name           Yahoo Auto Login
// @namespace      http://userscripts.org/users/00000
// @description    automatically logs into yahoo for you
// @include        https://www.irctc.co.in//*
// @include        http://www.irctc.co.in/*
// @copyright      Den Devil 
// @version        1.0.0
// ==/UserScript==

var form=document.getElementsByName("BookTicketForm")[0].getElementsByTagName("*");
for(var item in form) {
item.disabled=false;
item.removeAttribute("disabled");
}