// JavaScript Document
// ==UserScript==
// @name            Rapidshare Alert After Delay Timer
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Rapidshare Alert After Delay Timer
// @include         http://*.rapidshare.com/*
// ==/UserScript==

var ss = document.createElement('script');
var scr = '';
scr += 'function newfc(){if(c>0){setTimeout("newfc()", 1000);}else{alert("Delay timer over, click on download button to start downloading");}}';
scr += 'newfc();';
var tt = document.createTextNode(scr);
ss.appendChild(tt);
document.body.insertBefore(ss, document.body.lastChild);
