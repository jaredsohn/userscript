// ==UserScript==
// @id             wiki.greasespot.net-3ed16137-0204-4e9e-91fb-edc4c7e1009f@scriptish
// @name           Reddit Auto Hide
// @version        1.0
// @namespace      Reddit Auto Hide
// @author         Xioden
// @description    Automatically hide
// @include        http://www.reddit.com/r/*/comments/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.js
// @run-at         document-end
// ==/UserScript==


var clickEvent  = document.createEvent ('MouseEvents');
clickEvent.initEvent("click", false, true);
var link =document.querySelector('.hide-button a');
if(link){
    link.dispatchEvent(clickEvent);
    }
$("div[class*='thing']").delay(1500).show(100);
