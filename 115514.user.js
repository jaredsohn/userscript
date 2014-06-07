// ==UserScript==
// @name           slidebarnotification
// @namespace      ankur
// @description    to get rid of slidebar notification
// @include        *.facebook.com/*
// ==/UserScript==


var a = document.getElementsByClassName("UIBeep");for(i=0;i<a.length;i++){a[i].style.display="none";}


