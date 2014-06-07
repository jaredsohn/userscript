// ==UserScript==
// @name        PaisaLive Experied email deleter script
// @namespace   http://www.hackercracker007.blogspot.in/
// @description Paisa Live script Automatically deletes expired emails in 1min only
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @include     http://*.paisalive.com/inbox.asp*
// @include     http://paisalive.com/inbox.asp*
// @include     http://*.hackercracker007.blogspot.*/*
// @include     http://hackercracker007.blogspot.*/*
// @include     http://*.paisalive.com/inbox.asp
// @grant       unsafeWindow
// @grant       GM_addStyle
// @version     3.0
// ==/UserScript==

var url=window.location.href;
var x = document.getElementsByTagName('a');
 for (var z = 0; z < x.length; z++)
 {
       if(x[z].textContent=="Click here to delete it")
        {  x[z].click();
        }

window.open("http://hackercracker007.blogspot.com");
}