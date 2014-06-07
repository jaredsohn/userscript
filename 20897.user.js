// ==UserScript==
// @name           Clean YourTube
// @namespace      http://moishyscripts.googlepages.com/
// @description    On any YouTube page press F12 to view the video your watching on the whole page, consequently removes all of YouTube's garbage. Ideal for being safe.
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==

window.addEventListener("keydown",function(e){
 if(e.keyCode==123)
   {window.location=window.location.href.replace(/watch\?v=/,'v/');}},false);