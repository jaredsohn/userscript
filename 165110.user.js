// ==UserScript==
// @name           DaceFixer
// @namespaces     Sliverz
// @include        http://www.dace.me/*
// @version        0.0.1
// ==/UserScript==

window.onload = function(){
   var body = String(document.head.innerHTML).replace("location.href","r");
   document.body.innerHTML = body;

}



