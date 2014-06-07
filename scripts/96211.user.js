// ==UserScript==
// @name           LoS_iframe_erase
// @description    This script will remove the iframe in "Legend of Soccer".
// @namespace      http://yuzuru.2ch.net/test/read.cgi/gameswf/1282565814/
// @include        http://ls2.entercrews.com/Jawfm2/*
// ==/UserScript==



var iframe = document.getElementsByTagName("iframe");

for(var i=0;i<iframe.length;i++){
    iframe[i].style.display = "none";
}
