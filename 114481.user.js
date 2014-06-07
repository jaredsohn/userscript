// ==UserScript==
// @name           fraidd
// @namespace      http://userscripts.org/users/101059
// @description    Because clicking on links just wastes time
// @include        *
// ==/UserScript==

var links=document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
 links[i].addEventListener(
  "mouseover",
  function() {
   this.style.position="fixed";
   this.style.left=Math.random()*95+"%";
   this.style.top=Math.random()*95+"%";
   return false;
  },
  false
 );
}
