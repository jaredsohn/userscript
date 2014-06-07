// ==UserScript==
// @name          JOE SIMMON'S Auto-refresh at PREDEFINE TIME
// @namespace      http://userscripts.org/users/23652
// @description    Refreshes the page at 11:21:00
// @include        http://www.irctc.co.in/cgi-bin/bv60.dll/*
// @copyright      JoeSimmons
// ==/UserScript==

function check() {

var dt = document.evaluate("//div[@title='Date and Time' and @class='menutext']",document,null,9,null).singleNodeValue;

if(dt) {

if(/11:21:00/.test(dt.innerHTML)) {window.location.reload();}

}

}

window.addEventListener("load", check, false);