// ==UserScript== 
// @name           Pixiv Reader
// @namespace      pixivlink
// @description    open direct link to pixiv original image, to be used in conjunct with google reader and relcontrol.
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==

var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){pixivlink(event);},true);

function pixivlink(event){   
    if (event.target.tagName=="DIV"){
         try{
             feedItem = event.target.getElementsByTagName('DIV');
             for (var i = 0; i < feedItem.length; i++) {
                 feedItem = feedItem[i];
                 feedImages = feedItem.getElementsByTagName('img');
                 for (var i = 0; i < feedImages.length; i++) {
                     var imgEl = feedImages[i];
                     var aEl = imgEl.parentNode;
                     rex = /pixiv.net/i;
                     if(rex.test(imgEl.src)) {
                       var srcEl = imgEl.src.replace(/_s\./, ".");
                       aEl.href = srcEl;
                     }
                 }
             }
         }
         catch(e){
         }
     }
}