// ==UserScript==
// @name        mms2http
// @description Tiny script to replace mms: links with http: so the user can choose helper app.
// @include     *
// ==/UserScript==

var lnx=document.getElementsByTagName('a'); 
for(var i=0;i<lnx.length;i++)
 {
   Bob = lnx[i].href;
   if(Bob.search(/^mms:/) > -1) {
     Bob = Bob.replace(/^mms:/, 'http:');
     lnx[i].href = Bob;
   }
 }
