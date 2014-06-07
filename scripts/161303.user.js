// ==UserScript==
// @name        print_skitour
// @description	Ouvre automatiquement les pages topo de skitour en version imprimable
// @namespace   http://skitour.fr
// @include     http://www.skitour.fr*,*
// @version     1
// ==/UserScript==


// url
document.title='tot';
var doc=document.location.href;
document.title=doc;
var iti=doc.substring(doc.lastIndexOf(",")+1,doc.lastIndexOf("."));
document.title="http://www.skitour.fr/topos/print_"+iti+".html";
window.location.replace("http://www.skitour.fr/topos/print_"+iti+".html");

