// ==UserScript==
// @name         Grommr image unblocker
// @namespace    http://identi.ca/otakukuma
// @version      0.1
// @description  A script to unblock pictures and allow to download them easily
// @include      http://www.grommr.com/*
// ==/UserScript==

var pics = document.getElementsByTagName("img");

for (var i = 0; i < pics.length; i++){
    if (pics[i].getAttributeNode("oncontextmenu")){
        var attr2change = pics[i].getAttributeNode("oncontextmenu");
        attr2change.value = "return true;"
    }
        
}