// ==UserScript== 
// @name Spineless
// @description Remove information about Marty Peretz's blog from http://www.tnr.com/*
// @author John Bullock
// @version 0.5 (2008 03 08) 
// @include http://*.tnr.com/*
// ==/UserScript==

if (window.location.href.indexOf('www.tnr.com/')>-1) { 
  spine = document.getElementById("theSpine");
  spine.parentNode.style.display = "none";
}

else { //if (window.location.href.indexOf('blogs.tnr.com')>-1) {
  var divs = document.getElementsByTagName("div");
  for (i=0; i<divs.length; i++) {
    if (divs[i].id.match('spine') || divs[i].id.match('Spine')) { divs[i].style.display = "none"; }
  }
}