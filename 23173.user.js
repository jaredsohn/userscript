// ==UserScript==
// @name		biggrFlickr
// @namespace	
// @description	view larger flickr images in Google Reader
// @include	http://www.google.com/reader/*
// @include	https://www.google.com/reader/*
// ==/UserScript==


var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

 function nodeInserted(event){   
    if (event.target.tagName=="DIV"){
         try{
             feedItem = event.target.getElementsByTagName('DIV');
             for (var i = 0; i < feedItem.length; i++) {
                 feedItem = feedItem[i];
                 feedImages = feedItem.getElementsByTagName('img');
                 for (var i = 0; i < feedImages.length; i++) {
                     var imgEl = feedImages[i];
                     var newImgSrc = imgEl.src.replace(/_m.jpg/, ".jpg");
                     imgEl.src = newImgSrc;
                     imgEl.removeAttribute('width');
                     imgEl.removeAttribute('height');
                 }
             }
         }
         catch(e){
         }
     }
}