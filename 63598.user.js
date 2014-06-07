// ==UserScript== 
// @name   TunitechAdClean
// @namespace 
// @description Get rid of these annoying floating ads 
// @include http://www.tunitech.net/*
// @exclude 
// @exclude 
// ==/UserScript==


 if (screen.width<=1024) {
         document.getElementById('advertisementBox').style.visibility='hidden';
 }
