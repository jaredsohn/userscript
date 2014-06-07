// ==UserScript==
// @name 		Turulcsirip _blank link, mert ide jólesik!
// @include       		http://turulcsirip.hu*
// @exclude		*.js
// @exclude		*.gif
// @exclude		*.jpg
// @exclude		*.png
// ==/UserScript==
(function(){
  var x,i;
  x=document.links;
  for(i=0;i<x.length;++i) {
    x[i].target="_blank";
  }
}
)();