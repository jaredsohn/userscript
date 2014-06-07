// ==UserScript==
// @name           Remove Facebook Highlights Ads
// @namespace      dicerandom
// @include        http://*.facebook.com/*
// @version        0.3
// ==/UserScript==


function getElementsByClassName(classname, node) {
   if(!node) node = document.getElementsByTagName("body")[0];

   var a = [];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = node.getElementsByTagName("*");

   for(var i=0,j=els.length; i<j; i++)
      if(re.test(els[i].className))a.push(els[i]);

   return a;
}

var ads = getElementsByClassName('emu_ad');
for(var i=0,j=ads.length; i<j; i++)
   ads[i].innerHTML='';

document.getElementById('highlights_ad').innerHTML='';