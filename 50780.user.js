
// ==UserScript==
// @name          Itu-Reklam-Engelle
// @description   reklam engelleme aparati
// @include       http://www.itusozluk.com/listele.php
// @include http://www.itusozluk.com/ads/*
// ==/UserScript==

var as=document.getElementsByTagName("a");

var i=0;
for(i=0;i<as.length;i++)
  {
    if(as[i].className=="adlink"){
      as[i].parentNode.parentNode.parentNode.style.display="none";
      break;
    }
    
    
  }



var rklm=document.getElementsByTagName("title");
if(rklm[0].innerHTML=="reklam"){
  rklm[0].parentNode.parentNode.getElementsByTagName("body")[0].style.display="none";
}