// ==UserScript==
// @name           Facepunch Viewport Width
// @description    Fixes the Viewport Width on Facepunch for mobile devices.
// @include        http://www.facepunch.com/*
// @match          http://www.facepunch.com/*
// ==/UserScript==

var m=document.getElementsByTagName('meta');

for(var c=0;c<m.length;c++) {
if(m[c].content=='width=750') {
   alert(m[c].content); 
   m[c].content=''; 
   alert(m[c].content);
  }
 }