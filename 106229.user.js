// ==UserScript==
// @name           Remove el escudo de riBer del Olé
// @namespace      ole.com.ar
// @description    Saca el escudo de riBer de la pagina del Olé
// @include        http*://www.ole.com.ar/*
// ==/UserScript==

// v1.3 //attempt

var classname = 'river-plate'; 
var divs = document.getElementsByClassName(classname) ;

for(i=0; i <divs.length;i++) {
if(divs[i].className == 'river-plate') {
         divs[i].id = 'riber';
         divs[i].className = 'bb-noshow'; 
 } 
}

var riber = document.getElementById("riber") ;
riber.style.visibility = 'hidden';