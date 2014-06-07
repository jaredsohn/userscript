// ==UserScript==
// @name            flickr note removal
// @description     Flickr notes are so annoying. This takes them out when you're viewing someone's photos
// @author          Batman
// @version         1.0 (July 28th, 2006)
// @include         http://*.flickr.com/*
// @include         http://flickr.com/*
// ==/UserScript==

(function(){
var imgs=document.getElementsByTagName('img');
for (i = (imgs.length - 1); i >= 0; i--) {
   if (imgs[i].className == "trans_png") {
     imgs[i].style.display="none";
   }
   if (imgs[i].className == "reflect") {
     imgs[i].removeAttribute('onLoad'); 
   }
 }
var divs=document.getElementsByTagName('div');
for (i = (divs.length - 1); i >= 0; i--) {
   if (divs[i].className.indexOf("photo_note") == 0) {
     divs[i].style.width="0";
     divs[i].style.display="none";
     divs[i].parentNode.removeChild(divs[i]);
   }
   if (divs[i].className == "photoImgDiv") {
     divs[i].removeAttribute('onMouseOver'); 
     divs[i].removeAttribute('onMouseOut'); 
   }
 }
 notes = document.getElementById("photo_notes");
 if (notes) {notes.parentNode.removeChild(notes);}
 notes = document.getElementById("notes_text_div");
 if (notes) {notes.parentNode.removeChild(notes);}
 notes = document.getElementById("shadow_div");
 if (notes) { 
   notes.style.display = "none";
   notes.style.width = "0";
   notes.parentNode.removeChild(notes);
}
})()

