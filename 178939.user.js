// ==UserScript==
// @name        Gaia Centered Site Reverter
// @namespace   http://userscripts.org/users/307495
// @include     http://www.gaiaonline.com/*
// @grant       none
// @version     1
// ==/UserScript==

function removecssfile(filename){
 var allsuspects=document.getElementsByTagName('link')
 for (var i=allsuspects.length; i>=0; i--){ 
  if (allsuspects[i] && allsuspects[i].getAttribute('href')!=null && allsuspects[i].getAttribute('href').indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i])
 }
}

removecssfile("core2_centered.css");