// ==UserScript==
// @name          Bypass "Become a Fan"
// @description   Annoyed by the "Become a fan to see the image" pages on Facebook? Use this extension to see the images without being a fan.
// @include       http://www.facebook.com/pages/*
// @include       https://www.facebook.com/pages/*
// ==/UserScript==

function reveal_hidden(){
  for(var t=document.getElementsByTagName("*"), l=t.length; l--;)
    t[l].style.visibility = "";
}
reveal_hidden();
setInterval(reveal_hidden,1000);
