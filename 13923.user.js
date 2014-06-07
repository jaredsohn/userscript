// ==UserScript==

// @name           postblock

// @namespace      SAscripts

// @description    strips out the "post" button in threads so you don't hit it by accident.

// @include        http://forums.somethingawful.com/showthread*

// ==/UserScript==

var x=document.getElementsByTagName("a");
for (var i = 0; i < x.length; i++){
 var foo = x[i];
  if (foo.getAttribute("href").substring(0,33) == 'newthread.php?s=&action=newthread'){
   foo.parentNode.removeChild(foo);
  }
}