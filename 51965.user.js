// ==UserScript==
// @name           Linkwechsler

// @namespace      Dyndns

// @description    Privat Script

// @include        http://???.dyndns.org/

// @include        http://???.de.vu/


// ==/UserScript==

var elems=document.getElementsByTagName("a");
for(var i=0;i<elems.length;i++){
   elems[i].href=elems[i].href.replace('http://???.dyndns.org/','http://localhost/');
}