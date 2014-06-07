// ==UserScript==
// @name        qrrno2
// @namespace   qrrno2
// @include     http://qrrro.com/images/*
// @grant none
// @run-at      document-start
// @version     2013-12-06.01
// ==/UserScript==

function onbeforeunload(e) 
{
    setTimeout(function() { window.history.go(-2);  }, 0);
    window.removeEventListener("beforeunload", onbeforeunload, true);
}

var URL=document.location.href;
if(URL.substr(URL.length-9, 4 ) =='.jpg' ){
    RES=URL.substr(0, URL.length-5)
    window.location= RES;
} else {
    window.addEventListener("beforeunload", onbeforeunload, true);
}
