// ==UserScript==
// @name          Facebook like all
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
function unattackloop () {     
   setTimeout(function () {    
      if( (tobeliked[i].title=="Stop liking this item") || (tobeliked[i].title=="Unlike this comment")){tobeliked[i].click();}
      i++;        
      if (i < tobeliked.length) {            
         unattackloop();             
      }                        
   }, 1000)
}
var tobeliked = document.getElementsByTagName("button");
var attackbutton=document.getElementById("fbProfileCover");
attackbutton.innerHTML = attackbutton.innerHTML+"<input id='attackfunlisten' type='button' value='Attack this person'/><input id='unattackfunlisten' type='button' value='Unattack this person'/>";
var attackfun = document.getElementById("attackfunlisten");
attackfun.addEventListener("click", attackloop, false);
var attackfun = document.getElementById("unattackfunlisten");
attackfun.addEventListener("click", unattackloop, false);