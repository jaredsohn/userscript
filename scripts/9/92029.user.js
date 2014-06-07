// ==UserScript==
// @name           Magma Time Receiver
// @namespace      archonz.com
// @description    Gets the time you can get a magma pet.
// @include        *neopets.com/magma/pool.phtml
// ==/UserScript==

var strHTML = document.body.innerHTML;
var yourTime = new Date();


if(strHTML.indexOf("I'm sorry, only those well-versed in the ways of Moltara are permitted to enter the Pool.") < 0){
 alert(yourTime); 
} else { 
 window.setTimeout(function(){window.location.reload() ;},300000) ;
} 
return;