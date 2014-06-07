// ==UserScript==
// @name        fbfun
// @namespace   www.izklop.com
// @include     https://www.facebook.com/*
// @version     1
// @grant       none
// ==/UserScript==

var i;
for(i=0;i<document.getElementsByClassName("UFILikeLink").length;i++) 
    {
        document.getElementsByClassName("UFILikeLink")[i].innerHTML = "Jošt mi je všeč";
    }