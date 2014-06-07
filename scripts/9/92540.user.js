// ==UserScript== 
// @name Spineless Again
// @description Remove information about Marty Peretz's blog from http://www.tnr.com/*
// @author John Bullock; updated by kevinthegreat
// @version 0.6 (2010 12 12) 
// @include http://*.tnr.com/*
// ==/UserScript==

if (window.location.href.indexOf('www.tnr.com/')>-1) { 
  spine = document.getElementById("the-spine");
  spine.style.display = "none";
}

else { //if (window.location.href.indexOf('blogs.tnr.com')>-1) {
  var divs = document.getElementsByTagName("div");
  for (i=0; i<divs.length; i++) {
    if (divs[i].id.match('the-spine')) { divs[i].style.display = "none"; }
  }
}