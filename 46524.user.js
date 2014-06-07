// ==UserScript==
// @name Webcat Plus Target Top
// @namespace http://www.nikolaschka.com/
// @description ver.0.2
// @include http://webcatplus-equal.nii.ac.jp/*
// ==/UserScript==

(function() {
 var REPLACE_TARGET = "book";
 var SET_TARGET = "_top";
 var DEL_REL = "external";
 aList = document.getElementsByTagName("a");
 
 for(i=0; i<aList.length; i++) {
  if(aList[i].getAttribute("target") == REPLACE_TARGET) {
   aList[i].setAttribute("target", SET_TARGET);
  } else if(aList[i].getAttribute("rel") == DEL_REL) {
   aList[i].removeAttribute("rel");
  }
 }
})(); 