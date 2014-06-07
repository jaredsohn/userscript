// ==UserScript==
// @name        qrrno
// @namespace   qrrno
// @include     http://qrrro.com/images/*
// @grant none
// @version     1
// ==/UserScript==


  
var URL=document.location.href;
if(URL.substr(URL.length-9, 4 ) =='.jpg' ){
    RES=URL.substr(0, URL.length-5)
    window.location= RES;
}
    //document.forms['F1'].submit();