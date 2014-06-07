// ==UserScript==
// @name           eAcelerator
// @include        http://www.erepublik.com/*
// ==/UserScript==


var images = document.getElementsByTagName('img');
for (var n = images.length; n--> 0;) {
  var img = images[n];
  img.setAttribute("src", "");
}
document.addEventListener('DOMNodeInserted',function(event){
  event.srcElement.setAttribute("src","");
},
true);