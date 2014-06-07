// ==UserScript==
// @name          indyarocks
// @namespace     mande3p
// @description  flood sms sms
// @include        *http://www.indyarocks.com/*
// ==/UserScript==

if(document.location=="http://www.indyarocks.com/send/free-sms")
{
document.getElementById('frno').value=9870888888;
document.getElementById('message3').value='SPRITE 

K12'+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+

Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
void(0);
document.getElementById('but_nomember_sms').click();
}
