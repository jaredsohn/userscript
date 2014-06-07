// ==UserScript==
// @name           Twitter Hide Tweets
// @namespace      Meir
// @include        http://twitter.com/*
// @include        https://twitter.com/*

// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @description	  Hide all users tweets
// ==/UserScript==


  setInterval(
      function() {
if (document.querySelectorAll){
    var clsElements = document.querySelectorAll(".tweet p");
var len = clsElements.length;
for (var i=0;i<len;i++){
clsElements[i].style.display="none";
}
}
          
      }, 1000);
