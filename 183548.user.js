// ==UserScript==
// @name       My Fancy New Userscript
// @version    0.3
// @description  enter something useful
// @include	   *youtube.com/*
// @include	   http://www.youtube.com/*
// @include	   http://*.youtube.com/*
// @include	   https://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==


console.log("llllllllllllllll");
if (document.URL.indexOf("watch") != -1 && document.URL.indexOf("hd=1") == -1){
    
    document.location = document.URL + "&hd=1";
}

//if(document.referrer.indexOf("&hd=1") == -1){
//    document.location = document.referrer + "&hd=1";}
