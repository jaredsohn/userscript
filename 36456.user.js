// ==UserScript== 
// @name           no
// @namespace      imoutolink
// @description    no
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==

var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){imoutolink(event);},true);

function imoutolink(event){   
    if (event.target.tagName=="DIV"){
         try{
             feedItem = event.target.getElementsByTagName('DIV');
             for (var i = 0; i < feedItem.length; i++) {
                 feedItem = feedItem[i];
                 feedImages = feedItem.getElementsByTagName('img');
                 for (var i = 0; i < feedImages.length; i++) {
                     var imgEl = feedImages[i];
                     var aEl = imgEl.parentNode;
                     rex = /moe.imouto.org/i;
                     if(rex.test(imgEl.src)) {
                       var srcEl = imgEl.src.replace(/./, ".");
                       aEl.href = srcEl;
                     }
                 }
             }
         }
         catch(e){
         }
     }
}