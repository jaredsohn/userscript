// ==UserScript==
// @name           Magma Time Finder
// @namespace      sljackson.co.uk
// @description    Refreshes the Magma Pool page every 5 minutes until your magma time is found.
// @include        *neopets.com/magma/pool.phtml
// @include http://www.neopets.com/magma/pool.phtml
// @grant metadata
// ==/UserScript==

var strHTML = document.body.innerHTML;
var yourTime = new Date();


if(strHTML.indexOf("I'm sorry, only those well-versed in the ways of Moltara are permitted to enter the Pool.") < 0){
 alert(yourTime); 
} else {
 var lastCheck = document.createElement("div");
 lastCheck.innerHTML = "Last Check: " + yourTime.toString();
 var parent = document.getElementsByClassName("content")[0];
 parent.insertBefore(lastCheck, parent.children[1]);  
 window.setTimeout(function(){window.location.reload() ;},300000) ;
} 
return;