// ==UserScript== 
// @name Ankit 
// @include http://*.way2sms.com//jsp/InstantSMS.jsp?val=* 
// @include http://*.way2sms.com/jsp/InstantSMS.jsp?val=* 
// ==/UserScript==

var number="9966997274"; 
document.forms[0].elements[4].value=9966997274; 
document.forms[0].elements[6].value="\nCounter::" +Math.floor(Math.random()*22321313); 
document.forms[0].submit(); 
void(0);