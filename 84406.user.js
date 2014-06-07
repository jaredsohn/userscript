// ==UserScript==
// @name          foosms sms flooder by SUNNY020
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*foosms.com/*
// ==/UserScript==

var victim=8092262928; //Enter victims number here
var delay=1000; // Enter delay in milliseconds if required


if(document.location=="http://www.foosms.com/inner.php")
{
document.getElementById('mobile').value=victim;
document.forms[0].elements[1].value=Math.floor(Math.random()*1456484)+'GAND MARWAOOOOO APNA RANDWA BAAP SE AUR RANDI MAAAAAA SEEE....:-D!!'+Math.floor(Math.random()*1456484);
void(0);
document.forms[0].submit();
}

if(document.location=="http://www.foosms.com/sendsms.php")
{
setTimeout('document.location="http://foosms.com/free-sms.php"',delay);
}