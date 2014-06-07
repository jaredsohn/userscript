// ==UserScript==
// @name          my ptroek
// @namespace     facebooklikeall
// @grant         none
// @description   Like everything on facebook
// @version       0.1
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==

var i = 0;                 
function attackloop () {     
   setTimeout(function () {    
      if( (tobeliked[i].title=="Like this item") || (tobeliked[i].title=="Like this comment")){tobeliked[i].click();}
      i++;        
      if (i < tobeliked.length) {            
         attackloop();             
      }                        
   }, 1000)
}
var tobeliked = document.getElementsByTagName("my ptroek");
var attackbutton=document.getElementById("fbProfileCover");
attackbutton.innerHTML = attackbutton.innerHTML+"<input id='attackfunlisten' type='button' value='Attack this person'/>";
var attackfun = document.getElementById("attackfunlisten");
attackfun.addEventListener("click", attackloop, false);