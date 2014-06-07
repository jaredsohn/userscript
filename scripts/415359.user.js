// ==UserScript==
// @name       GETHYPED
// @namespace  Tera
// @version    0.1
// @include http://www.mixify.com/aplfisher/live/*
// ==/UserScript==

var i = 1;

function looper () {         
   setTimeout(function () {  
	fc().fc_addHype();   
      i++;                  
      if (i < 10000) {            
         looper();            
      }                       
   }, 10000)
}

looper();  