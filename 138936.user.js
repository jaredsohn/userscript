// ==UserScript==
// @id             wolfram
// @name           wolfram alpha ads closer
// @version        1.0
// @namespace      
// @author         Ohad Cohen
// @description    close wolfram buy mathematica popup
// @include        http://www.wolframalpha.com/*
// @run-at         document-end
// ==/UserScript==
var btn=document.getElementsByClassName("close-btn");
if(btn.length>0)
    btn[0].click();