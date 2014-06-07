// ==UserScript==
// @name          showalttext
// @namespace     http://zzo38computer.cjb.net/userjs/
// ==/UserScript==

// Script to display alt text even if the image is loaded

// Latest version is available at:
//  http://zzo38computer.cjb.net/userjs/showalttext.user.js

for(i=0;i<document.images.length;i+=1) {
  o=document.images[i];
  if(o.alt!="" && o.title=="") o.title=o.alt;
}
